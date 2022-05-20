import React from 'react'
import { FaChevronCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Example from './charts/Traffic';


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
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
            <span><Link to={'#'}><FaChevronCircleRight /></Link></span>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
          </div>
        </div>
        <div className='overview_summay_item with_link'>
          <h5>Total sales</h5>
          <p className='count'>$24.50</p>
          <div className='with_link_footer'>
            <p className='faded'>$12.4K this month</p>
          </div>
        </div>
      </div>

      {/* TRAFFIC CHARTS */}
      <div className='chart_container'>
        <Example />
      </div>
    </div>
  )
}

export default Overview