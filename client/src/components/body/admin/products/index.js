import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch, FiCalendar } from 'react-icons/fi'
import { MdAdd, MdKeyboardArrowDown, MdOutlineMoreHoriz } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { IoMdArrowDropdown } from 'react-icons/io'
import Add from './Add'
import Edit from './Edit'
import axios from 'axios'
import { toast } from 'react-toastify'
import './styles.css'

const Sellers = () => {
  const [ratingValue, setRatingValue] = useState(0)
  const [showAddPart, setShowAddPart] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [products, setProducts] = useState([])

  const users = useSelector(state => state.users)
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  const { user, isAdmin } = auth

  useEffect(() => {
    if (isAdmin) {
      getProducts()
    }
  }, [token, isAdmin])

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/shop/products', { headers: { Authorization: token } })
      setProducts([...res.data])
      toast.success('Products load success!', { theme: 'styled' })
    } catch (error) {
      toast.error(error.response.data.message, { theme: 'styled' })
    }
  }

  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers products_page_headers'>
        <h2>Products</h2>

        <span className='admin_products_selects'>
          <select>
            <option>Make</option>
          </select>
          <select>
            <option>Model</option>
          </select>
          <select>
            <option>Year</option>
          </select>
          <select>
            <option>Part</option>
          </select>
          <button className='search_'>Search</button>
        </span>

        <div className='sellers_totals products_totals'>
          <span className='products_totals_available'>Available</span>
          <span>455</span>
        </div>
      </div>

      <div className='admin_sellers_filters'>
        <div className='sellers_left_filter'>
          <div className='admin_sellers_filter_add product_filter_btn' id='product_filter_btn'>
            <button>Available <MdKeyboardArrowDown /></button>
            <button><MdAdd /> Add filter</button>
          </div>
          <div className='admin_sellers_filter_selected'>
            <span>Plan is Auto Shop  <GrClose /></span>
            <span>City is LA  <GrClose /></span>
            <span>State is California  <GrClose /></span>
          </div>
        </div>

        <div className='sellers_right_filter'>
          <div>
            <div className='date_range'>
              <FiCalendar /> <span>1 Jan 22 - 13 Jan 22</span>
            </div>
            <div className='admin_buyers_add'>
              <button> <MdAdd /> Add Part</button>
            </div>
          </div>
        </div>
      </div>

      <div className="tableFixHead">
        <table>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Image<IoMdArrowDropdown /></th>
              <th>Make<IoMdArrowDropdown /></th>
              <th>Model<IoMdArrowDropdown /></th>
              <th>Year<IoMdArrowDropdown /></th>
              <th>Part<IoMdArrowDropdown /></th>
              <th>Part No.<IoMdArrowDropdown /></th>
              {/* <th>Description<IoMdArrowDropdown /></th> */}
              <th>Price <IoMdArrowDropdown /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => {
                return (
                  <tr key={product._id}>
                    <td><input type='checkbox' /></td>
                    <td><img src={product.multiple_image[0]} alt="" /></td>
                    <td>{product.make}</td>
                    <td>{product.model}</td>
                    <td>{product.year}</td>
                    <td>{product.part}</td>
                    <td>{product.partNumber}</td>
                    {/* <td>{product.description.substring(0, 20)}</td> */}
                    <td>${product.price}</td>
                    <td><MdOutlineMoreHoriz /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className='admin_table_pagnation'>
        <div className="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a className="active" href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
  )
}

export default Sellers