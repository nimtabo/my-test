import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
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

      <div className='admin_sellers_filters'></div>

      <div class="tableFixHead">
        <table>
          <thead>
            <tr>
              <th></th>
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

export default Sellers