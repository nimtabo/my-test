import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import logo from '../../img/fiaraalogo7.PNG'
import services_arrow from '../../img/services_arrow.svg'


function Header() {
    const auth = useSelector(state => state.auth)

    const { user, isLogged, isAdmin } = auth

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const handleMenu = () => {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    const userLink = () => {
        return <>
            <div className="service_dropdown">
                <button className="dropbtn">Services <i className="fas fa-caret-down"></i></button>
                <div className="dropdown-content">
                    <Link to="/">FIND YOUR PART</Link>
                    <Link to="/get_website">WEBSITE SERVICES</Link>
                    {/* <Link to="/#">SELL YOUR USED CAR</Link> */}
                </div>
            </div>
            <li className="login"><Link to="/pricing">Pricing</Link></li>
            {/* ******************** */}
            <li className="drop-nav">
                <Link to="#" className="avatar">
                    <img src={user.avatar} alt="" /> <span>{user.store ? user.store.substring(0, 10) : user.code}</span> <i className="fas fa-angle-down"></i>
                </Link>
                <ul className="dropdown">
                    {
                        isAdmin ? <>
                            <li><Link to="/profile">My Profile</Link></li>
                            {user.profile === 0 && <li><Link to="/admin/dashboard">Dashboard</Link></li>}
                            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                        </>
                            : <>
                                <li><Link to="/profile">My Profile</Link></li>
                                {user.profile === 0 && <li><Link to="/shops">My Store</Link></li>}
                                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                            </>
                    }

                </ul>
            </li>
        </>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header className="topnav" id="myTopnav">
            <div className="logo">
                <Link to="/"><img src={logo} alt="fiaraa-logo" /></Link>
            </div>

            <ul style={transForm}>
                {
                    isLogged
                        ? userLink()
                        : <>
                            <div className="service_dropdown">
                                {/* <button className="dropbtn">Services <i className="fas fa-caret-down"></i></button> */}
                                <button className="dropbtn">Services <img src={services_arrow} alt="" /></button>
                                <div className="dropdown-content">
                                    <Link to="/">FIND YOUR PART</Link>
                                    <Link to="/get_website">WEBSITE SERVICES</Link>
                                    {/* <Link to="/#">SELL YOUR USED CAR</Link> */}
                                </div>
                            </div>
                            <li className="login"><Link to="/pricing">Pricing</Link></li>
                            {/* ************** */}
                            <li className="register"><Link to="/register">Sell</Link></li>
                            <li className="login"><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                            {/* <Link className="icon" onClick={handleMenu}>menu</Link> */}
                        </>
                }

            </ul>
        </header>
    )
}

export default Header
