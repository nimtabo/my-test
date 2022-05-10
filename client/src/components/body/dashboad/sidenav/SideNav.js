import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import './sidenav.css'


function SideNav({ handleOpenNav, width }) {
  const [isActive, setIsActive] = useState(false)
  const auth = useSelector(state => state.auth)

  const { user, isAdmin } = auth

  const handleDropDown = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <div className="sidebar" style={{ width: width }}>
        <button className="closebtn" onClick={handleOpenNav}>X</button>
        {isAdmin ?
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button onClick={handleDropDown} className={`dropdown-btn `}>Stores
              <i className="fa fa-caret-down"></i>
            </button>
            <div style={{ display: `${isActive ? "block" : "none"}` }} className="dropdown-container">
              <NavLink to="/shops">Add store</NavLink>
              <NavLink to="/shops">All stores</NavLink>
              <NavLink to="/shops">manage</NavLink>
            </div>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </>
          :
          <>
            {/* <NavLink to="/dashboad">Dashboad</NavLink> */}
            <NavLink to="/shops">{user.store}</NavLink>
            <NavLink to="/plans">Subscriptions</NavLink>
            {/* <NavLink to="#">Settings</NavLink> */}
          </>
        }
      </div>

      {/* <div id="main" style={{ marginLeft: leftMargin }}>
        <button class="openbtn" onClick={handleOpenNav}>☰ Open Sidebar</button>
        <h2>Collapsed Sidebar</h2>
        <p>Click on idebar, and push this content to the right.</p>
      </div> */}
    </>
  );
}

export default SideNav;