import React from 'react'
import SideNav from '../sidenav/SideNav'



import './shop.css'
import ShopForm from './ShopForm'
import ShopTable from './ShopTable'




function Shops({ handleOpenNav, width }) {
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
        <div className="shop_window">
          <h1>Businesses</h1>
          <div className="add_product_btn">
            <button>Add Business</button>
          </div>
          {/* **** */}
          {/* <ShopForm /> */}
          <ShopTable />
          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Shops
