import React, { useState } from 'react'
import SideNav from './sidenav/SideNav'
import Main from './main/Main'
import './dashboad.css'

function Dashboad() {
  const [width, setWidth] = useState("0px")
  // const [leftMargin, setLeftMargin] = useState("0px")

  const handleOpenNav = () => {
    setWidth(width === "0px" ? "250px" : "0px")
    // setLeftMargin(leftMargin === "0px" ? "250px" : "0px")
  }

  return (
    <div>
      <div className="dashboad_page">
        <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />
        <Main handleOpenNav={handleOpenNav} />
        {/* Content */}
      </div>
    </div>
  )
}

export default Dashboad
