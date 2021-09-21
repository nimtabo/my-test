import React from 'react'
import SideNav from '../sidenav/SideNav'
// **********
import './shop.css'
import ShopForm from './ShopForm'
import ShopTable from './ShopTable'
import ProductsTable from './ProductsTable'


function Shops({ handleOpenNav, width }) {
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
        <div className="shop_window">
          <h1>My Ads</h1>
          <div className="add_product_btn">
            <button>Create Ad</button>
          </div>
          {/* **** */}
          {/* <ShopForm /> */}
          <ProductsTable />
          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Shops
