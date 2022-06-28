import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiSearch, FiCalendar } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdAdd, MdOutlineMoreHoriz } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Rating } from 'react-simple-star-rating'
import Add from './Add'
import Edit from './Edit'
import axios from 'axios'
import { toast } from 'react-toastify'
import './styles.css'


const Store = () => {
  const [ratingValue, setRatingValue] = useState(0)
  const [showAddPart, setShowAddPart] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [stores, setStores] = useState([])

  const users = useSelector(state => state.users)
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  const { user, isAdmin } = auth

  useEffect(() => {
    if (isAdmin) {
      getStores()
    }
  }, [token, isAdmin])

  const getStores = async () => {
    try {
      const res = await axios.get('/api/shop/list', { headers: { Authorization: token } })
      setStores([...res.data])
      toast.success('Stores load success!', { theme: 'styled' })
    } catch (error) {
      toast.error(error.response.data.message, { theme: 'styled' })
    }
  }

  const handleRating = (rate) => {
    setRatingValue(rate)
  }

  const handleReset = () => {
    setRatingValue(2.5)
  }

  return (
    <div className='admin_stores_page'>
      {/* MODALS START */}
      <div id="add_parts_container"
        style={showAddPart ? { display: "block" } : { display: "none", }}>
        <Add
          setShowAddPart={setShowAddPart}
          showAddPart={showAddPart}
        />
      </div>
      <div id="add_parts_container"
        style={showEdit ? { display: "block" } : { display: "none", }}>
        <Edit
          setShowEdit={setShowEdit}
          showEdit={showEdit}
        />
      </div>
      {/* MODALS END */}
      <div className='admin_sellers_page_headers admin_stores_header'>
        <h2>Stores</h2>

        <span className='admin_sellers_headers_search '>
          <span>
            <FiSearch />
          </span>
          <input type='search' placeholder='Search' />
        </span>
      </div>

      <div className='admin_sellers_filters'>
        <div className='sellers_left_filter'>
          <div className='admin_sellers_filter_add'><button><MdAdd /> Add filter</button></div>
          <div className='admin_sellers_filter_selected'>
            <span>Plan is Auto Shop  <GrClose /></span>
            <span>City is LA  <GrClose /></span>
            <span>State is California  <GrClose /></span>
            <span>Rating is 1  <GrClose /></span>
          </div>
        </div>

        <div className='sellers_right_filter'>
          <div>
            <div className='date_range'>
              <FiCalendar /> <span>1 Jan 22 - 13 Jan 22</span>
            </div>
            <div className='admin_buyers_add'>
              <button> <MdAdd /> Add Store</button>
            </div>
          </div>
        </div>
      </div>

      {/* ****** */}
      <div className="tableFixHead admin_stores_table">
        <table>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Store Name <IoMdArrowDropdown /></th>
              <th>Plan <IoMdArrowDropdown /></th>
              <th>Paid <IoMdArrowDropdown /></th>
              <th>Rating <IoMdArrowDropdown /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              stores.map(store => {
                return (
                  <tr key={store._id}>
                    <td><input type='checkbox' /></td>
                    <td> <Link to={`#`}>{store.name}</Link></td>
                    <td><span className='admin_stores_table_plan auto_shop'>Auto Shop</span></td>
                    <td>$834</td>
                    <td><Rating
                      onClick={handleRating}
                      initialValue={3.5}
                      ratingValue={ratingValue}
                      allowHalfIcon
                    /></td>
                    <td><MdOutlineMoreHoriz /></td>
                  </tr>)
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

export default Store