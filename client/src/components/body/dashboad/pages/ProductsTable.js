import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import { ModalContent, ModalFooter, ModalButton, useDialog, CustomDialog, Prompt, Alert } from 'react-st-modal';

import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification';

import ProductForm from './ProductForm'

import './table.css'
import { async } from 'crypto-random-string';
import ProductTableFilterForm from './ProductTableFilterForm';
import EditProductForm from './EditProductForm';
import FileUpload from '../../../file-upload/file-upload';
import EditModal from './EditModal';


const ProductsTable = () => {
  const [showAddPart, setShowAddPart] = useState(false)
  const [showEditPart, setShowEditPart] = useState(false)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState('')
  const [shop, setShop] = useState('')
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [updateTable, setUpdateTable] = useState(false)
  const [adFilter, setAdFilter] = useState("available")
  const [selectedItems, setSelectedItems] = useState([]);


  const token = useSelector(state => state.token)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const shops = await axios.get('/api/shop/shops', {
          headers: { Authorization: token }
        });
        setShop(shops.data)
        const products = await axios.get(`/api/shop/shops/${shops.data}/products/available`);
        setProducts([...products.data])
        // console.log(products.data)

      } catch (error) {
        console.log("An Error occured getting PARTS")
        // console.log(error.message)
        return setProducts([...[]])
      }
    }
    fetchData();

  }, [updateTable])

  const deleteProduct = async (id, filter) => {
    // api/shop/shops/ISD/products/id
    try {
      await axios.delete(`/api/shop/shops/${shop}/products/${id}`, {
        headers: { Authorization: token }
      });
      // setAdFilter('archived')
      // filterTable("archived")
      setErr("Product deleted")
      setTimeout(() => {
        setErr("")
      }, 2000);
      filterTable(filter)
      // setUpdateTable(!updateTable)
    } catch (error) {
      setErr(error.msg)
    }
  }

  const arhiveProduct = async (id) => {
    // url = "/api/shop/shops/6093a22d5843f1295cae7178/products/6093c5c03f72a544f99b18bb"
    // api/shop/shops/ISD/products/id
    try {
      await axios.patch(`/api/shop/shops/${shop}/products/${id}/archive`, {}, {
        headers: { Authorization: token }
      });
      setErr("Product moved to Archives")
      setTimeout(() => {
        setErr("")
      }, 5000);
      setUpdateTable(!updateTable)
    } catch (error) {
      setErr(error.msg)
    }
  }

  const updateProduct = async (prod) => {
    setProduct(prod);
    setShowEditPart(!showEditPart);
  }

  const filterTable = async (filter) => {
    setAdFilter(filter)
    // if (adFilter === filter) {
    // console.log(filter)
    products.splice(0, products.length)
    try {
      const products = await axios.get(`/api/shop/shops/${shop}/products/${filter}`);
      setProducts([...products.data])
      // console.log({ products: products.data })

    } catch (error) {
      console.log("An Error occured getting products ADS ")
      // console.log(error.message)
      return setProducts([...[]])
    }
    // }
  }

  const handleChecked = (id) => {
    let selected = selectedItems
    // let find = selected.findIndex(item => item._id === id)
    let find = selected.indexOf(id)

    if (find > -1) {
      selected.splice(find, 1)
    } else {
      // We can use find to get the item based on its id
      // selected.push(products.find(item => item._id === id))
      selected.push(id)
    }
    setSelectedItems(selected)
  }

  const checkAll = (checked) => {
    let selected = []
    let ele = document.getElementsByName('chk');
    if (checked) {
      for (var i = 0; i < ele.length; i++) {
        if (ele[i].type == 'checkbox')
          ele[i].checked = true;
      }
      products.map(i => selected.push(i._id))
      setSelectedItems([...selected])
    } else {
      for (var i = 0; i < ele.length; i++) {
        if (ele[i].type == 'checkbox')
          ele[i].checked = false;
      }
      setSelectedItems([])
    }
    return selected
  }

  const availabilityUpdate = async (id, availability) => {
    if (parseInt(availability) === 4) {
      return deleteProduct(id, adFilter)
    }

    try {
      const savedProduct = await axios.patch(`/api/shop/shops/${shop}/products/${id}/action`, { availability }, {
        headers: { Authorization: token }
      });
      setSuccess(`Part Updated Successfully`)
      filterTable(adFilter)

      handleChecked(id)
      return setTimeout(() => {
        setSuccess('')
      }, 5000);

    } catch (error) {
      // console.log(error.message)
      setErr(`Part Update Failed`)
      return setTimeout(() => {
        setErr('')
      }, 3000);
    }
  }

  const handleAction = (action) => {
    selectedItems.map(id => {
      return availabilityUpdate(id, action)
    })
    document.getElementsByName('all_chk')[0].checked = false;
    return checkAll(false)
  }

  const filterStore = async (data) => {
    // shops/:shopId/products/filter'
    data.shop = shop

    switch (adFilter) {
      case "available":
        data.availability = 0
        break;
      case "soldout":
        data.availability = 1
        break;
      case "onhold":
        data.availability = 2
        break;
      case "archived":
        data.availability = 3
        break;

      default:
        return setErr("Error on filter keywords")
    }

    try {
      const res = await axios.post(`/api/shop/shops/${shop}/products/filter`, data);
      if (res.data.length === 0) {
        setErr("No Ad matched the search keywords")
        return setTimeout(() => {
          setErr('')
        }, 5000);
      }

      products.splice(0, products.length)
      setProducts([...res.data])

    } catch (error) {
      console.log("An Error occured getting products ADS ")
      return setProducts([...[]])
    }
  }
  return (
    <div>
      <div className="table_controls">

        <ProductTableFilterForm filterStore={filterStore} />

        <div className="add_product_btn">
          <button onClick={() => { setShowAddPart(!showAddPart) }}>Add Part</button>
        </div>
      </div>

      <div id="add_parts_container"
        style={showAddPart ? { display: "block" } : { display: "none", }}>
        <ProductForm
          setShowAddPart={setShowAddPart}
          showAddPart={showAddPart}
          adFilter={adFilter}
          filterTable={filterTable}
        />
      </div>

      {
        showEditPart && <div id="edit_modal_container"
          style={showEditPart ? { display: "block" } : { display: "none", }}>
          <EditModal
            product={product}
            filterTable={filterTable}
            adFilter={adFilter}
            // 
            setUpdateTable={setUpdateTable}
            updateTable={updateTable}
            setShowEditPart={setShowEditPart}
            showEditPart={showEditPart}
            // ****
            token={token}
            shop={shop}
            deleteProduct={deleteProduct}
            setErr={setErr}
            setSuccess={setSuccess}
          />
        </div>
      }

      {/* <div id="edit_parts_container"
        style={showEditPart ? { display: "block" } : { display: "none", }}>
        <EditProductForm
          setUpdateTable={setUpdateTable}
          updateTable={updateTable}
          product={product}
          setShowEditPart={setShowEditPart}
          showEditPart={showEditPart}
          filterTable={filterTable}
          adFilter={adFilter}
        />
      </div> */}

      <div>
        {err && showErrMsg(err) || success && showSuccessMsg(success)}
      </div>

      <div className="table_category_title_container">
        <select
          className="select_actions"
          name="actions"
          value={""}
          onChange={(e) => {
            handleAction(e.target.value)

          }}
        >
          <option>Bulk Action</option>
          {!(adFilter === "available") && <option value="0">Available</option>}
          {!(adFilter === "soldout") && <option value="1">Sold Out</option>}
          {!(adFilter === "onhold") && <option value="2">Put On-Hold</option>}
          {!(adFilter === "archived") && <option value="3">Archive</option>}
          <option value="4">Delete</option>
        </select>

        <div className="table_category_title">
          {adFilter ? `${adFilter === 'onhold' ? "ON-HOLD" : adFilter === 'soldout' ? "SOLD-OUT" : adFilter.toUpperCase()} PRODUCTS` : 'AVAILABLE PRODUCTS'}
        </div>

        <select
          className="add_filter_options"
          name="adFilter"
          value={""}
          onChange={(e) => {
            filterTable(e.target.value)
          }}
        >
          <option>Filter Ads</option>
          <option value="available">Available</option>
          <option value="onhold">On Hold</option>
          <option value="soldout">Sold Out</option>
          <option value="archived">Archive </option>
        </select>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th width={'2%'}>
              {/* <select>
                <option>Select Action</option>
                <option>Delete</option>
                <option>Sold out</option>
                <option>Available</option>
              </select> */}
              <input
                type="checkbox"
                onChange={(e) => { checkAll(e.target.checked) }}
                name='all_chk'
              />
            </th>
            <th width={'6%'}>Image</th>
            <th width={'7%'}>Make</th>
            <th width={'8%'}>Model</th>
            <th width={'6%'}>Year</th>
            <th width={'8%'}>Part Name</th>
            <th width={'7%'}>Part Number</th>
            <th width={'25%'}>Description</th>
            <th width={'7%'}>Price</th>
            <th width={'4%'}>
              {/* <select
                name="adFilter"
                value={""}
                onChange={(e) => {
                  filterTable(e.target.value)
                }}
              >
                <option>Filter Ads</option>
                <option value="available">Available</option>
                <option value="onhold">On Hold</option>
                <option value="soldout">Sold Out</option>
                <option value="archived">Archive </option>
              </select> */}
            </th>
          </tr>
        </thead>
        <tbody>

          {
            products.map((prod, index) => {
              return (<tr key={prod._id}>
                {/* ----------- */}
                <td><input type="checkbox"
                  onChange={() => handleChecked(prod._id)}
                  selected={selectedItems.includes(prod._id)}
                  name='chk'
                /></td>
                {/* ----------- */}
                <td className="part_image">
                  <img src={prod.multiple_image[0]} alt='' />
                </td>
                <td>{prod.make}</td>
                <td>{prod.model}</td>
                <td>{prod.year}</td>
                <td>{prod.part}</td>
                <td>{prod.partNumber}</td>
                <td className="wide_section">{prod.description.substring(0, 151)}</td>
                <td>{`$ ${prod.price}`}</td>
                <td>
                  {/* <button onClick={() => {
                    updateProduct(prod)
                  }}>Edit</button> */}
                  <button onClick={() => {
                    updateProduct(prod)
                  }}>Edit</button>
                  {/* <button onClick={async () => {
                    const result = await CustomDialog(<CustomDialogContent
                      product={{ ...prod }}
                      prodImgs={[...prod.multiple_image]}
                      token={token}
                      shop={shop}
                      filterTable={filterTable}
                      deleteProduct={deleteProduct}
                      adFilter={adFilter}
                      setErr={setErr}
                      setSuccess={setSuccess}
                    />, {
                      title: 'UPDATE PART',
                      showCloseIcon: true,
                      isCanClose: false,
                      isBodyScrollLocked: false,
                    });
                  }}>Edit</button> */}
                  {/* <span> </span> */}
                  {/* {
                    adFilter === "archived" ? <button onClick={() => { deleteProduct(prod._id) }}>Delete</button> : ''
                  } */}
                  {/* <button onClick={() => {
                    adFilter === "archived" ? deleteProduct(prod._id) : arhiveProduct(prod._id)
                  }}>{adFilter === "archived" ? "Delete" : "Archive"}</button> */}
                </td>
              </tr>)
            })
          }

        </tbody>
      </table>

    </div >
  )
}

function CustomDialogContent({ product, prodImgs, token, shop, filterTable, deleteProduct, adFilter, setSuccess, setErr }) {
  const dialog = useDialog();
  const [partNumber, setPartNumber] = useState("")
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState("")
  const [isAvailable, setIsAvailable] = useState('')
  const [imgs, setImgs] = useState([])

  const [value, setValue] = useState();
  const [data, setData] = useState({
    partNumber: '',
    description: '',
    price: '',
    availability: '',
  })

  useEffect(() => {
    const populateData = async () => {
      try {
        setPartNumber(product.partNumber)
        setDescription(product.description)
        setPrice(product.price)
        setIsAvailable(product.availability)
        // setImgs([...prodImgs])
      } catch (error) {
        console.log(error.msg)
      }

    }
    populateData()
  })



  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const deleteImg = async (url) => {

    console.log({ id: product._id, url })
    try {
      const res = await axios.patch(`/api/shop/shops/${shop}/products/${product._id}/delete_image`, { url }, {
        headers: { Authorization: token }
      });
      setSuccess("Image Deleted")
      // let updatedImages = imgs.filter(item => url !== item)
      // setImgs([...updatedImages])
      return setTimeout(() => {
        setSuccess('')
      }, 5000);
    } catch (error) {
      console.log(error.message)
      setErr("Image not deleted")
      return setTimeout(() => {
        setErr('')
      }, 5000);
    }
  }

  const handleClick = async () => {
    let newProduct = { ...data }

    if (data.partNumber === '') {
      newProduct.partNumber = partNumber
      // console.log({ partNumber })
    }
    if (data.description === '') {
      newProduct.description = description
    }
    if (data.price === '') {
      newProduct.price = price
    }
    if (data.availability === '') {
      newProduct.availability = isAvailable
    }
    if (parseInt(newProduct.availability) === 4) {
      return deleteProduct(product._id, adFilter)
    }
    try {
      const savedProduct = await axios.patch(`/api/shop/shops/${shop}/products/${product._id}`, newProduct, {
        headers: { Authorization: token }
      });
      setSuccess(`Part Updated Successfully`)
      filterTable(adFilter)
      // console.log(savedProduct.data)
      return setTimeout(() => {
        setSuccess('')
      }, 3000);
    } catch (error) {
      // console.log(error.message)
      setErr(`Part Update Failed`)
      return setTimeout(() => {
        setErr('')
      }, 3000);
    }
  }

  return (
    <div>
      <ModalContent>
        <div>Part Number:</div>
        <label>

          <input
            type="text" name="partNumber"
            defaultValue={partNumber}
            onChange={handleChange}
          // onChange={(e) => { setPartNumber(e.target.value) }}
          />
        </label>
      </ModalContent>

      <ModalContent>
        <div>Description:</div>
        <label>

          {/* <input
            type="text" name="description"
            defaultValue={description}
            onChange={handleChange}
          /> */}
          <textarea
            rows="4" cols="35"
            name="description"
            defaultValue={description}
            onChange={handleChange}
          >
          </textarea>
        </label>
      </ModalContent>

      <ModalContent>
        <div>price:</div>
        <label>

          <input
            type="number" name="price"
            // value={price}
            defaultValue={price}
            onChange={handleChange}
          // onChange={(e) => { setPrice(e.target.value) }}
          />
        </label>
      </ModalContent>

      <ModalContent>
        <div>Availability: </div>
        <label>

          <select name="availability"
            // value={isAvailable}
            defaultValue={isAvailable}
            onChange={handleChange}
          // onChange={(e) => { setIsAvailable(e.target.value) }}
          >
            <option value="">Select Option</option>
            {!(adFilter === "available") && <option value="0">Available</option>}
            {!(adFilter === "soldout") && <option value="1">Sold Out</option>}
            {!(adFilter === "onhold") && <option value="2">Put On-Hold</option>}
            {!(adFilter === "archived") && <option value="3">Archive</option>}
            <option value="4">Delete</option>
          </select>
        </label>
      </ModalContent>

      <ModalContent className='edit_images_container'>
        {product.multiple_image.map((i, idx) => {
          return <div key={idx} className="edit_img_container">
            <img className='edit_img' src={i} alt='' />
            <button onClick={() => deleteImg(i)} className="edit_img_centered">Delete</button>
          </div>
        })}
        <FileUpload />
      </ModalContent>

      <ModalFooter>
        <ModalButton
          onClick={() => {
            handleClick()
            dialog.close(value);
          }}
        >
          Update
        </ModalButton>
      </ModalFooter>
    </div>
  );
}

export default ProductsTable
