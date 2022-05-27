import React from 'react'
import { FaChevronCircleRight } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Example from './charts/Traffic';
import MultiChart from './charts/MultiChart';
import DateRangeSelector from "./datePicker";



const Overview = () => {
  return (
    <div className='overview_page_content'>
      <div className='admin_view_header'>
        <h1>Welcome, Sam</h1>
        <h5>Here's what's happening in admin account</h5>
      </div>

      <div className='overview_summay_items'>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total Stores</h5>
          <p className='count'>30</p>
          <div className='with_link_footer'>
            <p className='faded'>10 store this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total Products</h5>
          <p className='count'>600</p>
          <div className='with_link_footer'>
            <p className='faded'>200 prod. this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Todays Visits</h5>
          <p className='count'>1.2K</p>
          <div className='with_link_footer'>
            <p className='faded'>10 visitors right now</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Pending Tickets</h5>
          <p className='count'>6</p>
          <div className='with_link_footer'>
            <p className='faded'>35 tickets resolved</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Reg. Buyers</h5>
          <p className='count'>960</p>
          <div className='with_link_footer'>
            <p className='faded'>102 Buyers this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Free Plan</h5>
          <p className='count'>12</p>
          <div className='with_link_footer'>
            <p className='faded'>2 new this month</p>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Individual Plan</h5>
          <p className='count'>45</p>
          <div className='with_link_footer'>
            <p className='faded'>12 new this month</p>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Auto Shop Plan</h5>
          <p className='count'>60</p>
          <div className='with_link_footer'>
            <p className='faded'>9 new this month</p>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Dealership Plan</h5>
          <p className='count'>39</p>
          <div className='with_link_footer'>
            <p className='faded'>11 new this month</p>
          </div>
        </div>
      </div>

      {/* TRAFFIC CHARTS */}
      <div className='chart_container'>
        <div className='chart_item_headers'>
          <div className='chart_item_header'>
            <h3>Traffic </h3>
            <p>No. of visitors come to your website everyday</p>
          </div>
          <div className='chart_item_header'>
            <span>
              <DateRangeSelector />
            </span>
            <span><FiSettings /></span>
          </div>
        </div>
        <div className='chart_item_chart'>
          <Example />
        </div>
      </div>

      <div className='chart_container'>
        <div className='chart_item_headers'>
          <div className='chart_item_header'>
            <h3>Revenue </h3>
            <p>Every month earning</p>
          </div>
          <div className='chart_item_header'>
            <span>
              <DateRangeSelector />
            </span>
            <span><FiSettings /></span>
          </div>
        </div>
        <div className='chart_item_chart'>
          <Example />
        </div>
      </div>

      <div className='chart_container'>
        <div className='chart_item_headers'>
          <div className='chart_item_header'>
            <h3>Stores </h3>
            <p>No. of active stores every month</p>
          </div>
          <div className='chart_item_header'>
            <span>
              <DateRangeSelector />
            </span>
            <span><FiSettings /></span>
          </div>
        </div>
        <div className='chart_item_chart'>
          <MultiChart />
        </div>
      </div>

      <div className='chart_container'>
        <div className='chart_item_headers'>
          <div className='chart_item_header'>
            <h3>Registered Buyers </h3>
            <p>No. of Buyers every month</p>
          </div>
          <div className='chart_item_header'>
            <span>
              <DateRangeSelector />
            </span>
            <span><FiSettings /></span>
          </div>
        </div>
        <div className='chart_item_chart'>
          <Example />
        </div>
      </div>


    </div>
  )
}

export default Overview