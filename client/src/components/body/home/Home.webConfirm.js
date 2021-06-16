import React from 'react'
import './home.css'

function HomeWebConfirm() {
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
              <h2>Confirmation</h2>
            </div>

            <div className="hero-form-pricing">
              <h3 className="pay_success_head">Payment Successful!!! </h3>

              <br /> <br /> <br />
              <p id="pay_success_text">
                Thank You For Approaching us to build your website to level up business in digital world.
                We will contact you soon via email.
              </p>
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

export default HomeWebConfirm
