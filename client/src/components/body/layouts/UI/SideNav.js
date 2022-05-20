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
        <span style={{ display: width === "22%" && 'none' }} className="closebtn" onClick={handleOpenNav}>
          <FaChevronCircleRight />
        </span>
      </div>
      <Link to="/admin/dashboard"><MdViewQuilt /> {width === "22%" && 'Overview'}</Link>
      <Link to="/admin/stores"><BiStore /> {width === "22%" && 'Stores'}</Link>
      <Link to="#"><MdProductionQuantityLimits /> {width === "22%" && 'Products'}</Link>
      <Link to="#"><MdSell /> {width === "22%" && 'Sellers'}</Link>
      <Link to="#"><FaCartPlus /> {width === "22%" && 'Buyers'}</Link>
      <Link to="#"><RiTeamLine /> {width === "22%" && 'Team'}</Link>
      <Link to="#"><BiStats /> {width === "22%" && 'Staticstics'}</Link>
      <Link to="#"><MdQueryStats /> {width === "22%" && 'Finance'}</Link>
      <Link to="#"><ImTicket /> {width === "22%" && 'Tickets'}</Link>
      <Link to="#"><MdOutlineSettings /> {width === "22%" && 'Settings'}</Link>
    </div >
  )
}

export default SideNav