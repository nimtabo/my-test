import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'


function Header() {
    const auth = useSelector(state => state.auth)

    const { user, isLogged } = auth


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
            <li className="drop-nav">
                <Link to="#" className="avatar">
                    <img src={user.avatar} alt="" /> {user.name} <i className="fas fa-angle-down"></i>
                </Link>
                <ul className="dropdown">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/dashboad">Dashboad</Link></li>
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
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
                <h1><Link to="/">Fiaraa</Link></h1>
            </div>

            <div className="service_dropdown">
                <button className="dropbtn">Services</button>
                <div className="dropdown-content">
                    <Link to="/">FIND YOUR PART</Link>
                    <Link to="/get_website">WEBSITE SERVICES</Link>
                    <Link to="/#">SELL YOUR USED CAR</Link>
                </div>
            </div>

            <ul style={transForm}>
                {
                    isLogged
                        ? userLink()
                        : <>
                            <li className="register"><Link to="/register">Register</Link></li>
                            <li className="login"><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                            {/* <Link className="icon" onClick={handleMenu}>menu</Link> */}
                        </>
                }

            </ul>
        </header>
    )
}

export default Header
