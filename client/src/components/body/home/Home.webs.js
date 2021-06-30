import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function HomeWebs() {
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
            <div>
              <label htmlFor="zip-code" className="labels">NAME: </label>
              <input id="zip-code" />
            </div>

            <div>
              <label htmlFor="zip-code" className="labels">EMAIL: </label>
              <input id="zip-code" />
            </div>

            <div>
              <label htmlFor="zip-code" className="labels">PHONE NO: </label>
              <input id="zip-code" />
            </div>

            <div>
              <p><Link to="/websites"> Know in detail about website service</Link></p>
            </div>

            <div>
              <button><Link to="/webs_plans">NEXT</Link></button>
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

export default HomeWebs
