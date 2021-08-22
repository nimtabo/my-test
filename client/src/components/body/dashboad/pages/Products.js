import React from 'react'
import SideNav from '../sidenav/SideNav'



import './shop.css'
import ProductForm from './ProductForm'
import ProductsTable from './ProductsTable'




function Products({ handleOpenNav, width }) {
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
        <div className="shop_window">
          <h1>Products Ads</h1>
          {/* **** */}
          <div className="add_product_btn">
            <button>Add product</button>
          </div>
          {/* <ProductForm /> */}
          <ProductsTable />
          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Products
