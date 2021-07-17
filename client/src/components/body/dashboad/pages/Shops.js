import React from 'react'
import SideNav from '../sidenav/SideNav'



import './shop.css'
import ShopForm from './ShopForm'




function Shops({ handleOpenNav, width }) {
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
        <div className="shop_window">
          <h1>Shops</h1>
          {/* **** */}
          <ShopForm />
          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Shops
