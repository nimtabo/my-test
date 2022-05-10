import React, { useState } from 'react'
import Main from './UI/Main'
import SideNav from './UI/SideNav'

const AdminLayout = ({ children }) => {
  const [width, setWidth] = useState("25%");

  const handleOpenNav = () => {
    setWidth(width === "25%" ? "10%" : "25%")
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