import React from 'react'
import { FiSearch, FiCalendar } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import './styles.css'

const Sellers = () => {
  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers products_page_headers'>
        <h2>Products</h2>

        <span className='admin_sellers_headers_search'>
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
          <button className='search_'>Search <MdKeyboardArrowDown /></button>
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