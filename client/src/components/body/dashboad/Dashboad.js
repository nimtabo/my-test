import React, { useState } from 'react'
import SideNav from './sidenav/SideNav'
import './dashboad.css'
import { Link, NavLink } from 'react-router-dom'

function Dashboard(props) {
  const [width, setWidth] = useState("0px")

  const handleOpenNav = () => {
    setWidth(width === "0px" ? "250px" : "0px")
  }

  return (
    <div>
      <div className="dashboad_page">
        <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />
        {/* <Main handleOpenNav={handleOpenNav} /> */}
        {/* Content */}
        <div id="main">
          <div className='shop_main_header'>
            <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
            <div className='header_links'>
              <NavLink
                to="/billing"
                className={isActive =>
                  "" + (!isActive ? "" : "")
                }
              >Billing Details</NavLink>
              <NavLink
                to="/payment_history"
                className={isActive =>
                  "" + (!isActive ? "" : "")
                }
              >Payment History</NavLink>
              <NavLink
                to="renew"
                className={isActive =>
                  "" + (!isActive ? "" : "")
                }
              >Renewals</NavLink>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
