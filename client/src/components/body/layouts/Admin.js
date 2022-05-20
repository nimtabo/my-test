import React, { useState } from 'react'
import Main from './UI/Main'
import SideNav from './UI/SideNav'
import './admin.css'

const AdminLayout = ({ children }) => {
  const [width, setWidth] = useState("22%");

  const handleOpenNav = () => {
    setWidth(width === "22%" ? "10%" : "22%")
  }
  return (
    <div>
      <SideNav handleOpenNav={handleOpenNav} width={width} />
      <Main width={width}>
        {children}
      </Main>
    </div>
  )
}

export default AdminLayout