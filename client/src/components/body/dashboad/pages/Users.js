import React from 'react'
import SideNav from '../sidenav/SideNav'


import './shop.css'
import UserTable from './UserTable'


const Users = ({ handleOpenNav, width }) => {
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
        <div className="shop_window">
          <h1>Users</h1>
          {/* **** */}
          <div className="add_product_btn">
            <button>Add User</button>
          </div>
          {/* <ProductForm /> */}
          <UserTable />
          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Users
