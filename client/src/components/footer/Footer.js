import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

import logo_f from '../../img/logo_f.svg'
import fb from '../../img/fb.svg'
import ig from '../../img/ig.svg'
import twitter from '../../img/twitter.svg'
import youtube from '../../img/youtube.svg'

function Footer() {
  return (
    <div className="footer_page">
      {/* Left */}
      <div className="item left">
        <h1>
          <img src={logo_f} alt="f-logo" />
        </h1>

        <p>
          At fiaraa.com we aim to put <br />
          customers at forefront and provide <br />
          quality products at doorstep
        </p>
      </div>
      {/* center */}
      <div className="item">
        <h3>SUPPORT AND SERVICES</h3>

        <ul>
          <li><Link to="/terms">Terms & Conditions</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services Offered</Link></li>
          {/* <li><Link to="/contacts">Contact Us</Link></li> */}
          {/* <li><Link to="/pricing">Pricing</Link></li> */}
          {/* <li><Link to="/websites">Website Services</Link></li> */}
        </ul>
      </div>
      {/* *** */}
      <div className="item right">
        <h3>NEED HELP ?</h3>

        <p>
          Email: info@fiaraa.com
          <br />
          Phone No.: +1-(234)-567438
        </p>
        <p id="chat_request"><i className="fas fa-comment-dots"></i> Chat Request</p>

        <div className="socials">
          <span>
            <img alt="" src={fb} />
          </span>
          <span>
            <img alt="" src={twitter} />
          </span>
          <span>
            <img alt="" src={youtube} />
          </span>
          <span>
            <img alt="" src={ig} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
