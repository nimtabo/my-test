import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaChevronCircleLeft, FaChevronCircleRight, FaCartPlus } from 'react-icons/fa';
import { BiStore, BiStats } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { ImTicket } from 'react-icons/im';
import { MdProductionQuantityLimits, MdSell, MdQueryStats, MdOutlineSettings, MdViewQuilt } from 'react-icons/md';
import logo from '../../../../img/logo_f.svg'

import './sidenav.css'

const SideNav = ({ handleOpenNav, width }) => {

  return (
    <div className="admin_sidenav" style={{ width: width }}>
      <div className='side_logo'>
        <img src={logo} alt="logo" /><span style={{ display: width === "10%" && 'none' }} className='admin_text'>Admin</span> <span style={{ display: width === "10%" && 'none' }} className='admin_text_2'> Dashboard</span>
        <span style={{ display: width === "10%" && 'none' }} className="closebtn" onClick={handleOpenNav}>
          <FaChevronCircleLeft />
        </span>
        <span style={{ display: width === "25%" && 'none' }} className="closebtn" onClick={handleOpenNav}>
          <FaChevronCircleRight />
        </span>
      </div>
      <Link to="/admin/dashboard"><MdViewQuilt /> Overview</Link>
      <Link to="/admin/stores"><BiStore /> Stores</Link>
      <Link to="#"><MdProductionQuantityLimits /> Products</Link>
      <Link to="#"><MdSell /> Sellers</Link>
      <Link to="#"><FaCartPlus /> Buyers</Link>
      <Link to="#"><RiTeamLine /> Team</Link>
      <Link to="#"><BiStats /> Staticstics</Link>
      <Link to="#"><MdQueryStats /> Finance</Link>
      <Link to="#"><ImTicket /> Tickets</Link>
      <Link to="#"><MdOutlineSettings /> Settings</Link>
    </div >
  )
}

export default SideNav