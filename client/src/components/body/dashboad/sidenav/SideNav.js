import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './sidenav.css'


function SideNav({ handleOpenNav, width }) {
  const auth = useSelector(state => state.auth)

  const { user, isAdmin } = auth


  return (
    <>
      <div className="sidebar" style={{ width: width }}>
        <button className="closebtn" onClick={handleOpenNav}>X</button>
        {isAdmin ?
          <>
            <Link to="/dashboad">Dashboad</Link>
            <Link to="/shops">Shops</Link>
            <Link to="/products">Products</Link>
            <Link to="/users">Users</Link>
            <Link to="#">Settings</Link>
          </>
          :
          <>
            {/* <Link to="/dashboad">Dashboad</Link> */}
            <Link to="/shops">My Store</Link>
            <Link to="/products">Products</Link>
            <Link to="#">Settings</Link>
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