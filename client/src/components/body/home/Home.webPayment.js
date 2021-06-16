import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function HomeWebPayment() {
  return (
    <div className="home_page">
      <div className="hero">

        <div className="hero-text">
          <h3>Wide Selection Of Auto Parts At Lowest Price</h3>
        </div>

        <div className="hero-form">
          <form>
            <div>
              <h2>WEBSITE SERVICES</h2>
            </div>

            <div className="hero-form-pricing">
              <h2>Payment</h2>
            </div>

            <div className="hero-form-pricing">
              <hr />
              <br />
              <hr />
              <br />
              <br /> <br /> <br />
              <br /> <br /> <br />
              <hr />
              <br /> <br /> <br /> <br />

              <br />
              <hr />

            </div>


            <div>
              <button><Link to="/webs_confirms">Submit</Link></button>
            </div>
          </form>
        </div>
      </div>


      {/* SUBSCRIBE */}
      <div className="subscribe">
        <p className="sub-text">
          Be The First To Know.
          <br />
          Exclusively Yours
        </p>

        <input type="text" placeholder="Enter your Email Address" />

        <div className="sub-btn">
          SUBSCRIBE
        </div>
      </div>
    </div>
  )
}

export default HomeWebPayment
