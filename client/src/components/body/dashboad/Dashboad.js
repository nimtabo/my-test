import React from 'react'
import SideNav from './sidenav/SideNav'
import './dashboad.css'

function Dashboard({ handleOpenNav, width }) {
  // const [width, setWidth] = useState("0px")

  // const handleOpenNav = () => {
  //   setWidth(width === "0px" ? "250px" : "0px")
  // }

  return (
    <div>
      <div className="dashboad_page">
        <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />
        {/* <Main handleOpenNav={handleOpenNav} /> */}
        {/* Content */}
        <div id="main">
          <button className="openbtn" onClick={handleOpenNav}>☰ Open Menu</button>
          <div className="content_window">
            <h3>Dashboard Charts</h3>
            <h3>Dashboard Graphs</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
