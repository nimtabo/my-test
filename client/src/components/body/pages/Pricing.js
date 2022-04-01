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
            <h2> <span className="span_text">$</span>0<span className="span_text">/month</span></h2>
            <div>
              <button>Create Account</button>
              <ul>
                <li>1 part upload</li>
                <li>Direct customer contact</li>
                <li>Access to our Estore</li>
              </ul>
            </div>
          </div>
          <div className="price-card">
            <h3>Individual Plan</h3>
            <hr />
            <h2> <span className="span_text">$</span> 9.99<span className="span_text">/month</span></h2>
            <div>
              <button>Buy Now</button>
              <ul>
                <li>30-days free trial</li>
                <li>5 part uploads</li>
                <li>Direct customer contact</li>
                <li>Access to our Estore</li>
                <li>Live Chat option with customer</li>
              </ul>
            </div>
          </div>
          <div className="price-card gold">
            <button className='popular'>POPULAR</button>
            <h3>Auto Shop Plan</h3>
            <hr />
            <h2> <span className="span_text">$</span> 29.99<span className="span_text">/month</span></h2>
            <div>
              <button>Buy Now</button>
              <ul>
                <li>30-days free trial</li>
                <li>20 part uploads</li>
                <li>Direct customer contact</li>
                <li>Access to our Estore</li>
                <li>Live Chat option with customer</li>
              </ul>
            </div>
          </div>
          <div className="price-card">
            <h3>Dealership Plan</h3>
            <hr />
            <h2> <span className="span_text">$</span> 49.99<span className="span_text">/month</span></h2>
            <div>
              <button>Buy Now</button>
              <ul>
                <li>30-days free trial</li>
                <li>35 part uploads</li>
                <li>Direct customer contact</li>
                <li>Access to our Estore</li>
                <li>Live Chat option with customer</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='card_paragraph'>
          <p>
            The above prices do not include applicable taxes based on your billing address.
          </p>
          <p>The final price will be displayed on the checkout page, before the payment is completed.</p>
          <p>If your are looking for a bigger package then contact us at <a href="mailto:info@fiaraa.com">info@fiaraa.com</a></p>
        </div>
      </div>

      <div className="pricing-plan-parts-container">
        <div className="pricing-plan-tittle">
          <h2>Pricing and Plans For Website Services </h2>
        </div>
        <div className="pricing-plan-parts">
          <div className="price-card">
            <h3>Basic Plan</h3>
            <hr />
            <h2><span className="span_text">US$</span> 17.99 <span className="span_text">/month</span> </h2>
            <button>Buy Now</button>
            <ul>
              <li>Free Subdomain (yourstore.fiaraa.com)</li>
              <li>Free maintenance & software update</li>
              <li>New customer outreach benefit with Fiaraa</li>
              <li>Free web security protection</li>
              <li>1 free business email (info@yourstore.fiaraa.com)</li>
              <li>50,000 monthly visit handle capacity</li>
            </ul>
          </div>

          <div className="price-card">
            <h3>Pro Plan</h3>
            <hr />
            <h2><span className="span_text">US$</span> 25.99 <span className="span_text">/month</span> </h2>
            <button>Buy Now</button>
            <ul>
              <li>Free Domain (yourstore.com)</li>
              <li>Free maintenance & software update</li>
              <li>New customer outreach benefit with Fiaraa</li>
              <li>Free web security protection</li>
              <li>1 free business email (info@yourstore.fiaraa.com)</li>
              <li>50,000 monthly visit handle capacity</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Pricing
