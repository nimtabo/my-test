import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaChevronCircleLeft, FaChevronCircleRight, FaCartPlus } from 'react-icons/fa';
import { BiStore, BiStats, BiDotsHorizontalRounded, BiLogOut } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { ImTicket } from 'react-icons/im';
import { MdProductionQuantityLimits, MdSell, MdQueryStats, MdOutlineSettings, MdViewQuilt } from 'react-icons/md';
import logo from '../../../../img/logo_f.svg'

import './sidenav.css'

const SideNav = ({ handleOpenNav, width }) => {
  const auth = useSelector(state => state.auth)
  const { user, isAdmin } = auth

  return (
    <div className="admin_sidenav" style={{ width: width }}>
      <div className='side_logo'>
        <img src={logo} alt="logo" /><span className='admin_text'>Admin</span> <span className='admin_text_2'> Dashboard</span>
        <span style={{ display: width === "8%" && 'none' }} className="closebtn" onClick={handleOpenNav}>
          <FaChevronCircleLeft />
        </span>
        <span style={{ display: width === "22%" && 'none' }} className="closebtn" onClick={handleOpenNav}>
          <FaChevronCircleRight />
        </span>
      </div>
      <Link to="/admin/dashboard"><MdViewQuilt />Overview</Link>
      <Link to="/admin/stores"><BiStore />Stores</Link>
      <Link to="#"><MdProductionQuantityLimits />Products</Link>
      <Link to="/admin/sellers"><MdSell />Sellers</Link>
      <Link to="#"><FaCartPlus />Buyers</Link>
      <Link to="#"><RiTeamLine />Team</Link>
      <Link to="#"><BiStats />Staticstics</Link>
      <Link to="#"><MdQueryStats />Finance</Link>
      <Link to="#"><ImTicket />Tickets</Link>
      <Link to="#"><MdOutlineSettings />Settings</Link>

      <div className='admin_sidenav_profile'>
        <p className='sidenav_profile_head'>PROFILE</p>
        <div className='profile_items'>
          <div className='profile_img'>
            <img src={user.avatar} alt="profile picture" />
          </div>
          <div id='profile_names'>
            <p>{user.name || "User Name"} <BiDotsHorizontalRounded /></p>
            <p>Web Developer</p>
          </div>
        </div>
        <button className='profile_logout'><BiLogOut /> Log out</button>
      </div>
    </div >
  )
}

export default SideNav