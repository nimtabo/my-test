import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function HomeWebPrice() {
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
              <h2>Pricing</h2>
            </div>

            <div className="hero-form-pricing">
              <h4>$17.77/month</h4>
              <p>
                Your website url will be a subdomain.
                (e.g. yourstorename.carparts.com)
                + 2 free changes per month
                (additional change $3)
              </p>
            </div>

            <div className="hero-form-pricing">
              <h4>$27.77/month</h4>
              <p>
                Your website url will be a new domain
                of your choice.
                (e.g. yourstorename.com)
                + 2 free changes per month
                (additional change $3)
              </p>
            </div>

            <div className="hero-form-pricing">
              I agree by checking this contract  that I will use your service for at least one year.
            </div>

            <div>
              <button type="submit"><Link to="/webs_pay">PAYMENT</Link></button>
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

export default HomeWebPrice
