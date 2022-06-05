import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiCalendar } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import './styles.css'

const Buyers = () => {
  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers buyers'>
        <h2>Buyers</h2>

        <span className='admin_sellers_headers_search'>
          <span>
            <FiSearch />
          </span>
          <input type='search' placeholder='Search' />
        </span>

        <div className='sellers_totals'>
          <span>Total</span>
          <span>455</span>
        </div>

        <div className='date_range'>
          <FiCalendar /> <span>1 Jan 22 - 13 Jan 22</span>
        </div>
      </div>

      <div className='admin_buyers_add'>
        <button> <MdAdd /> Add buyer</button>
      </div>

      <div className="tableFixHead">
        <table>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Name</th>
              <th>Buyer Id</th>
              <th>Email Address</th>
              <th>Registered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sambit Mohanty</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>13-02-2022</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sambit Mohanty</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>13-02-2022</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sambit Mohanty</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>13-02-2022</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Sambit Mohanty</td>
              <td>WWKTWK214151</td>
              <td>sambitmohanty903@gmail.com</td>
              <td>13-02-2022</td>
              <td><BiDotsHorizontalRounded /></td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className='admin_table_pagnation'>
        <div class="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a class="active" href="#">2</a>
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

export default Buyers