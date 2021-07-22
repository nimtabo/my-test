import React from 'react'
import './about.css'

function About() {
  return (
    <div className="about-us-page">
      <div className="page-title_about">
        <h1>About Us</h1>
        <p>We’re fiaraa and we’re transforming the used car parts buying experience across the globe</p>
      </div>
      <div className="top-container_about">
        <div className="left-item">
          <h3>Our mission</h3>
          <p>
            We want to make buying your next used car part no different to ordering any other product today. Where consumers can simply and seamlessly buy used car parts, used cars and additionally we offer website services to individuals, mechanics and recyclers to help them grow their business and bring global exposure.  Our online tools are powerful to help connect sellers to buyers in the most cost effective way at your fingertips.
          </p>
        </div>
        {/* <div className="right-item">Item right</div> */}
      </div>
      <div className="bottom-container_about">
        <h3>Our Team</h3>

        <div className="profiles">
          <div className="team-profile">
            <div className="team_image"></div>
            <p className="team_name">Nicholas Mtabo</p>
            <p className="team_title">Co-Founder, CTO</p>
          </div>

          <div className="team-profile">
            <div className="team_image"></div>
            <p className="team_name">Upendra Gandhi </p>
            <p className="team_title">Founder and CEO</p>
          </div>

          <div className="team-profile">
            <div className="team_image"></div>
            <p className="team_name">Zack Tyler</p>
            <p className="team_title">Co-Founder, SVP of Operations</p>
          </div>

          <div className="team-profile">
            <div className="team_image"></div>
            <p className="team_name">Sambit Mohanty </p>
            <p className="team_title">Co-Founder, SVP of Website Services</p>
          </div>

          <div className="team-profile">
            <div className="team_image"></div>
            <p className="team_name">Anusha Tripathi</p>
            <p className="team_title">Co-Founder, SVP of Marketing</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
