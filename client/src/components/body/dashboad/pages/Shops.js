import React from 'react'
import { useSelector } from 'react-redux'

import SideNav from '../sidenav/SideNav'
// **********
import './shop.css'
import ShopForm from './ShopForm'
import ShopTable from './ShopTable'
import ProductsTable from './ProductsTable'


function Shops({ handleOpenNav, width }) {
  const auth = useSelector(state => state.auth)

  const { user, isAdmin } = auth
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ My Store</button>
        <div className="shop_window">
          <h1>{user.store}</h1>
          {/* <div className="add_product_btn">
            <button>Create Ad</button>
          </div> */}
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
