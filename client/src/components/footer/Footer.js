import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer() {
  return (
    <div className="footer_page">
      {/* Left */}
      <div className="item left">
        <h1>LOGO</h1>

        <p>
          At fiaraa.com we aim to put <br />
          customer at forefront and provide <br />
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
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contacts">Contact Us</Link></li>
          {/* <li><Link to="/services">Services Offered</Link></li> */}
          {/* <li><Link to="/websites">Website Services</Link></li> */}
        </ul>
      </div>
      {/* *** */}
      <div className="item right">
        <h3>NEED HELP ?</h3>

        <p>
          Email: info@domain.com
          <br />
          Phone No.:+1-(234)-567438
        </p>

        <div className="socials">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-twitter"></i>
        </div>
      </div>
    </div>
  )
}

export default Footer
