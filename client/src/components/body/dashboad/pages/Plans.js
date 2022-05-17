import React from 'react'
import { useHistory } from "react-router-dom"
import Dashboad from '../Dashboad'
// **********
import './shop.css'


const Plans = () => {
  let history = useHistory()

  const checkout = () => {
    history.push("/checkout")
  }
  return (
    <Dashboad>
      <div className="shop_window">
        {/* <h1>Subscriptions</h1> */}

        {/* **** */}
        <div className="pricing-page">
          <div className="pricing-title">
            <h1>Subscriptions</h1>
          </div>
          <div className="pricing-plan-parts-container subscriptions_page">
            {/* <h4>7-DAY MONEY BACK GUARANTEE </h4> */}
            <div className="pricing-plan-tittle">
            </div>
            <div className='card_paragraph'>
              <h2>Select plan that help's grow </h2>
              <p>
                Read all plans or contact us at <a href="mailto:info@fiaraa.com">info@fiaraa.com</a> if you are looking for a bigger plan.
              </p>
            </div>

            <div className="pricing-plan-parts">

              <div className="price-card">
                <h3>Free Plan</h3>
                <h2> $0<span className="span_text">/month</span></h2>
                <div>
                  <ul>
                    <li>1 part upload</li>
                    <li>Direct customer contact</li>
                    <li>Access to our E-store</li>
                  </ul>
                  <button onClick={checkout}>Create Account</button>
                </div>
              </div>

              <div className="price-card">
                <h3>Individual Plan</h3>
                <h2> $9.99<span className="span_text">/month</span></h2>
                <div>
                  <ul>
                    <li>30-days free trial</li>
                    <li>5 part uploads</li>
                    <li>Direct customer contact</li>
                    <li>Access to our E-store</li>
                    <li>Live Chat option with customer</li>
                  </ul>
                  <button onClick={checkout}>Buy Now</button>
                </div>
              </div>
              <div className="price-card gold">
                <h4 className='popular'>Popular</h4>
                <h3>Auto Shop Plan</h3>
                <h2> $29.99<span className="span_text">/month</span></h2>
                <div>
                  <ul>
                    <li>30-days free trial</li>
                    <li>20 part uploads</li>
                    <li>Direct customer contact</li>
                    <li>Access to our E-store</li>
                    <li>Live Chat option with customer</li>
                  </ul>
                  <button onClick={checkout}>Buy Now</button>
                </div>
              </div>
              <div className="price-card">
                <h3>Dealership Plan</h3>
                <h2>$49.99<span className="span_text">/month</span></h2>
                <div>
                  <ul>
                    <li>30-days free trial</li>
                    <li>35 part uploads</li>
                    <li>Direct customer contact</li>
                    <li>Access to our E-store</li>
                    <li>Live Chat option with customer</li>
                  </ul>
                  <button onClick={checkout}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* **** */}
      </div>
    </Dashboad>
  )
}

export default Plans
