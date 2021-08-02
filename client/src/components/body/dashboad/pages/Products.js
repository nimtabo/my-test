import React from 'react'
import SideNav from '../sidenav/SideNav'



import './shop.css'
import ProductForm from './ProductForm'




function Products({ handleOpenNav, width }) {
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
        <div className="shop_window">
          <h1>create product Ad</h1>
          {/* **** */}
          <ProductForm />
          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Products
