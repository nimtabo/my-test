import React from 'react';
import { Link } from 'react-router-dom'

import './sidenav.css'


function SideNav({ handleOpenNav, width }) {


  return (
    <>
      <div className="sidebar" style={{ width: width }}>
        <button className="closebtn" onClick={handleOpenNav}>X</button>
        <Link to="/dashboad">Dashboad</Link>
        <Link to="/shops">Shops</Link>
        <Link to="#">Products</Link>
        <Link to="#">Users</Link>
        <Link to="#">Settings</Link>
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