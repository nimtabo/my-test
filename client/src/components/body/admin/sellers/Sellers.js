import React from 'react'
import { FiSearch, FiCalendar } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import './styles.css'

const Sellers = () => {
  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers'>
        <h2>Sellers</h2>

        <span className='admin_sellers_headers_search'>
          <span>
            <FiSearch />
          </span>
          <input type='search' placeholder='Search' />
        </span>

        <div className='sellers_totals'>
          <span>Total</span>
          <span>241</span>
        </div>
      </div>

      <div className='admin_sellers_filters'>
        <div className='sellers_left_filter'>
          <div className='admin_sellers_filter_add'><button><MdAdd /> Add filter</button></div>
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
              <button> <MdAdd /> Add buyer</button>
            </div>
          </div>
        </div>
      </div>

      <div className="tableFixHead">
        <table>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Store Name</th>
              <th>Seller Id</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Plan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sam Auto Parts</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>(897)2345-6754</td>
              <td>Auto Shop</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sam Auto Parts</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>(897)2345-6754</td>
              <td>Auto Shop</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sam Auto Parts</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>(897)2345-6754</td>
              <td>Auto Shop</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sam Auto Parts</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>(897)2345-6754</td>
              <td>Auto Shop</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>

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