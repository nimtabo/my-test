import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { BiLinkExternal } from 'react-icons/bi'
import { FiCalendar } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import './styles.css'

const Tickets = () => {
  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers buyers'>
        <h2>Tickets</h2>

        <span className='admin_sellers_headers_search'>
          <span>
            <FiSearch />
          </span>
          <input type='search' placeholder='Search' />
        </span>

        <div className='tickets_filter_by'>
          <span>Filter by</span>
          <select className='active_filter'>
            <option>status</option>
          </select>
          <select>
            <option>Assigned to</option>
          </select>
          <select>
            <option>Category</option>
          </select>
        </div>
      </div>

      <div className='admin_tickets_add'>
        <button> <MdAdd /> Add buyer</button>
      </div>

      <div className="tableFixHead tickets_table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Title</th>
              <th>Category</th>
              <th>Assigned to</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>INC000087796454</td>
              <td> <BiLinkExternal /> User can’t login to their accounts</td>
              <td>System</td>
              <td>Developer Team</td>
              <td>In Progress</td>
            </tr>
            <tr>
              <td>2</td>
              <td>INC000087796454</td>
              <td> <BiLinkExternal /> User can’t login to their accounts</td>
              <td>System</td>
              <td>Developer Team</td>
              <td>In Progress</td>
            </tr>
            <tr>
              <td>3</td>
              <td>INC000087796454</td>
              <td> <BiLinkExternal /> User can’t login to their accounts</td>
              <td>System</td>
              <td>Developer Team</td>
              <td>In Progress</td>
            </tr>
            <tr>
              <td>4</td>
              <td>INC000087796454</td>
              <td> <BiLinkExternal /> User can’t login to their accounts</td>
              <td>System</td>
              <td>Developer Team</td>
              <td>In Progress</td>
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

export default Tickets