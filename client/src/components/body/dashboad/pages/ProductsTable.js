import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";

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
  const [adFilter, setAdFilter] = useState("")

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
                  <button onClick={() => {
                    updateProduct(prod)
                  }}>Edit</button>
                  <span> </span>
                  <button onClick={() => {
                    adFilter === "archived" ? deleteProduct(prod._id) : arhiveProduct(prod._id)
                  }}>{adFilter === "archived" ? "Delete" : "Archive"}</button>
                </td>
              </tr>)
            })
          }
          {/* <tr>
            <td><input type="checkbox" /></td>
            <td className="part_image"></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>Machine Screw"</td>
            <td>222222100</td>
            <td>Hardware</td>
            <td>$200</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr> */}


        </tbody>
      </table>

    </div >
  )
}

export default ProductsTable
