import React from 'react'
import { FiSearch, FiCalendar } from 'react-icons/fi'
import { MdAdd, MdKeyboardArrowDown, MdOutlineMoreHoriz } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { IoMdArrowDropdown } from 'react-icons/io'
import './styles.css'

const Sellers = () => {
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
              <th>Description<IoMdArrowDropdown /></th>
              <th>Price <IoMdArrowDropdown /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>IMAGE</td>
              <td>Acura</td>
              <td>CSX</td>
              <td>200</td>
              <td>AC-Compressor</td>
              <td>2405</td>
              <td>Front bumper/22k...</td>
              <td>$821</td>
              <td><MdOutlineMoreHoriz /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>IMAGE</td>
              <td>Acura</td>
              <td>CSX</td>
              <td>200</td>
              <td>AC-Compressor</td>
              <td>2405</td>
              <td>Front bumper/22k...</td>
              <td>$821</td>
              <td><MdOutlineMoreHoriz /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>IMAGE</td>
              <td>Acura</td>
              <td>CSX</td>
              <td>200</td>
              <td>AC-Compressor</td>
              <td>2405</td>
              <td>Front bumper/22k...</td>
              <td>$821</td>
              <td><MdOutlineMoreHoriz /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>IMAGE</td>
              <td>Acura</td>
              <td>CSX</td>
              <td>200</td>
              <td>AC-Compressor</td>
              <td>2405</td>
              <td>Front bumper/22k...</td>
              <td>$821</td>
              <td><MdOutlineMoreHoriz /></td>
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