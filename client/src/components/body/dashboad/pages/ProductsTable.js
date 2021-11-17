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

  const deleteProduct = async (id) => {
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
      setUpdateTable(!updateTable)
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
      }, 2000);
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

  return (
    <div>
      <div className="table_controls">

        <ProductTableFilterForm />

        <div className="add_product_btn">
          <button onClick={() => { setShowAddPart(!showAddPart) }}>Add Part</button>
        </div>
      </div>

      <div id="add_parts_container"
        style={showAddPart ? { display: "block" } : { display: "none", }}>
        <ProductForm
          setUpdateTable={setUpdateTable}
          updateTable={updateTable}
          setShowAddPart={setShowAddPart}
          showAddPart={showAddPart}
        />
      </div>

      <div id="edit_parts_container"
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
      </div>

      <div>
        {err && showErrMsg(err) || success && showSuccessMsg(success)}
      </div>
      <div className="table_category_title">
        {adFilter ? `${adFilter === 'onhold' ? "ON-HOLD" : adFilter === 'soldout' ? "SOLD-OUT" : adFilter.toUpperCase()} PRODUCTS` : 'AVAILABLE PRODUCTS'}
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>
              {/* <select>
                <option>Select Action</option>
                <option>Delete</option>
                <option>Sold out</option>
                <option>Available</option>
              </select> */}
              <input type="checkbox" />
            </th>
            <th>Image</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Part Name</th>
            <th>Part Number</th>
            <th>Description</th>
            <th>Price</th>
            <th>
              <select
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
            </th>
          </tr>
        </thead>
        <tbody>

          {
            products.map(prod => {
              return (<tr key={prod._id}>
                <td><input type="checkbox" /></td>
                <td className="part_image"></td>
                <td>{prod.make}</td>
                <td>{prod.model}</td>
                <td>{prod.year}</td>
                <td>{prod.part}</td>
                <td>{prod.partNumber}</td>
                <td>{prod.description}</td>
                <td>{`$ ${prod.price}`}</td>
                <td>
                  {/* <button onClick={() => {
                    updateProduct(prod)
                  }}>Edit</button> */}
                  <button onClick={async () => {
                    const result = await CustomDialog(<CustomDialogContent
                      product={{ ...prod }}
                      token={token}
                      shop={shop}
                      setUpdateTable={setUpdateTable}
                      updateTable={updateTable}
                      deleteProduct={deleteProduct}
                      adFilter={adFilter}
                    />, {
                      title: 'UPDATE PART',
                      showCloseIcon: true,
                      isCanClose: false,
                      isBodyScrollLocked: false,
                    });
                  }}>Edit</button>
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

function CustomDialogContent({ product, token, shop, setUpdateTable, updateTable, deleteProduct, adFilter }) {
  const dialog = useDialog();
  const [partNumber, setPartNumber] = useState("")
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState("")
  const [isAvailable, setIsAvailable] = useState('')

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
      return deleteProduct(product._id)
    }
    try {
      const savedProduct = await axios.patch(`/api/shop/shops/${shop}/products/${product._id}`, newProduct, {
        headers: { Authorization: token }
      });
      setUpdateTable(updateTable)
      // console.log(savedProduct.data)
    } catch (error) {
      console.log(error.message)
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
            rows="2" cols="10"
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
