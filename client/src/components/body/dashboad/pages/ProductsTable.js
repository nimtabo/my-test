import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";

import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification';

import ProductForm from './ProductForm'

import './table.css'
import { async } from 'crypto-random-string';

const ProductsTable = () => {
  const [showAddPart, setShowAddPart] = useState(false)
  const [products, setProducts] = useState([])
  const [shop, setShop] = useState('')
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  const token = useSelector(state => state.token)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const shops = await axios.get('/api/shop/shops', {
          headers: { Authorization: token }
        });
        setShop(shops.data)
        const products = await axios.get(`/api/shop/shops/${shops.data}/products`);
        setProducts([...products.data])
        // console.log(products.data)

      } catch (error) {
        console.log("An Error occured getting PARTS")
        // console.log(error.message)
        return setProducts([...[]])
      }
    }
    fetchData();

  }, [])


  const deleteProduct = async (id) => {
    // url = "/api/shop/shops/6093a22d5843f1295cae7178/products/6093c5c03f72a544f99b18bb"
    try {
      await axios.delete(`/api/shop/shops/${shop}/products/${id}`, {
        headers: { Authorization: token }
      });
      setSuccess("Product deleted successfully")
    } catch (error) {
      setErr(error.message)
    }
  }

  return (
    <div>
      <div className="table_controls">

        <div className="table_search">
          <div>
            <select>
              <option>make</option>
              <option>make</option>
              <option>make</option>
            </select>
          </div>

          <div>
            <select>
              <option>model</option>
              <option>model</option>
              <option>model</option>
            </select>
          </div>

          <div>
            <select>
              <option>year</option>
              <option>year</option>
              <option>year</option>
            </select>
          </div>

          <div>
            <select>
              <option>Part Number</option>
              <option>Part Number</option>
              <option>Part Number</option>
            </select>
          </div>


          <div>
            <select>
              <option>Part</option>
              <option>Part</option>
              <option>Part</option>
            </select>
          </div>

        </div>

        <div className="add_product_btn">
          <button onClick={() => { setShowAddPart(!showAddPart) }}>Add Part</button>
        </div>
      </div>

      <div id="add_parts_container"
        style={showAddPart ? { display: "block" } : { display: "none", }}>
        <ProductForm />
      </div>

      <div>
        {err && showErrMsg}
      </div>
      <div>
        {success && showSuccessMsg}
      </div>
      <table class="styled-table">
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
              <select>
                <option>Select Action</option>
                <option>Delete</option>
                <option>Mark Sold out</option>
                <option>Mark Available</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>

          {
            products.map(prod => {
              return (<tr>
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
                  <button>Edit</button>
                  <span> </span>
                  <button onClick={() => {
                    deleteProduct(prod._id)
                  }}>Delete</button>
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
