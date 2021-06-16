import React from 'react';
import { Link } from 'react-router-dom'

import './sidenav.css'


function SideNav({ handleOpenNav, width }) {


  return (
    <>
      <div class="sidebar" style={{ width: width }}>
        <button class="closebtn" onClick={handleOpenNav}>X</button>
        <Link>Dashboad</Link>
        <Link to="/shops">Shops</Link>
        <Link>Products</Link>
        <Link>Users</Link>
        <Link>Settings</Link>
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