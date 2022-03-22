import React from 'react'
import './pricing.css'

function Pricing() {
  return (
    <div className="pricing-page">
      <div className="pricing-title">
        <h1>Subscription Pricing</h1>
      </div>

      <div className="pricing-plan-parts-container">
        <h4>7-DAY MONEY BACK GUARANTEE </h4>
        <div className="pricing-plan-tittle">
          <h2>Find The Right Seller Plan For You </h2>
        </div>
        <div className="pricing-plan-parts">
          <div className="price-card">
            <h3>Free Plan</h3>
            <hr />
            <h2> <sub className="sub_text">$</sub> 10<sub className="sub_text">/month</sub></h2>
            <div>
              <button>Create Account</button>
              <ul>
                <li>1 part upload</li>
                <li>Direct customer contact</li>
                <li>Acess to our Estore</li>
              </ul>
            </div>
          </div>
          <div className="price-card">
            <h3>Individual Plan</h3>
            <hr />
            <h2> <sub className="sub_text">$</sub> 9.99<sub className="sub_text">/month</sub></h2>
            <div>
              <button>Buy Now</button>
              <ul>
                <li>30-days free trial</li>
                <li>5 part uploads</li>
                <li>Direct customer contact</li>
                <li>Acess to our Estore</li>
                <li>Live Chat option with customer</li>
              </ul>
            </div>
          </div>
          <div className="price-card gold">
            <button className='popular'>POPULAR</button>
            <h3>Gold</h3>
            <hr />
            <h2> <sub className="sub_text">$</sub> 29.99<sub className="sub_text">/month</sub></h2>
            <div>
              <button>Buy Now</button>
              <ul>
                <li>30-days free trial</li>
                <li>20 part uploads</li>
                <li>Direct customer contact</li>
                <li>Acess to our Estore</li>
                <li>Live Chat option with customer</li>
              </ul>
            </div>
          </div>
          <div className="price-card">
            <h3>Gold</h3>
            <hr />
            <h2> <sub className="sub_text">$</sub> 49.99<sub className="sub_text">/month</sub></h2>
            <div>
              <button>Buy Now</button>
              <ul>
                <li>30-days free trial</li>
                <li>35 part uploads</li>
                <li>Direct customer contact</li>
                <li>Acess to our Estore</li>
                <li>Live Chat option with customer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="pricing-plan-parts-container">
        <div className="pricing-plan-tittle">
          <h2>Pricing and Plans For Website <br />Services </h2>
        </div>
        <div className="pricing-plan-parts">
          <div className="price-card">
            <h3>Basic</h3>
            <h2>$17.77 <sub className="sub_text">/month</sub> </h2>
            <hr />
            <p>
              Your website url will be a subdomain.
              <br />
              (e.g. yourstorename.fiaraa.com)
              <br />
              + 2 free changes per month
              <br />
              (additional change $3)
            </p>
          </div>

          <div className="price-card">
            <h3>Pro</h3>
            <h2>$27.77 <sub className="sub_text">/month</sub> </h2>
            <hr />
            <p>
              Your website url will be a new domain
              of your choice.
              <br />
              (e.g. yourstorename.com)
              <br />
              + 2 free changes per month
              <br />
              (additional change $3)
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Pricing
