import React from 'react'
import './pricing.css'

function Pricing() {
  return (
    <div className="pricing-page">
      <div className="pricing-title">
        <h1>Pricing</h1>
      </div>

      <div className="pricing-plan-parts-container">
        <div className="pricing-plan-tittle">
          <h2>Pricing and Plans For Used Auto <br /> <span>Parts Sellers</span> </h2>
        </div>
        <div className="pricing-plan-parts">
          <div className="price-card">
            <h3>Free</h3>
            <h2>$0 <sub className="sub_text">/month</sub> </h2>
            <hr />

            <div>
              <p>
                Permitted
                <br />
                To
                <br />
                Upload
                <br />
                Maximum
                <br />
                2 Parts
              </p>
            </div>
          </div>
          <div className="price-card">
            <h3>Bronze</h3>
            <h2>$10 <sub className="sub_text">/month</sub> </h2>
            <hr />
            <div>
              <p>
                Permitted
                <br />
                To
                <br />
                Upload
                <br />
                Maximum
                <br />
                5 Parts
              </p>
            </div>
          </div>
          <div className="price-card">
            <h3>Silver</h3>
            <h2>$20 <sub className="sub_text">/month</sub> </h2>
            <hr />
            <div>
              <p>
                Permitted
                <br />
                To
                <br />
                Upload
                <br />
                Maximum
                <br />
                10 Parts
              </p>
            </div>
          </div>
          <div className="price-card">
            <h3>Gold</h3>
            <h2>$30 <sub className="sub_text">/month</sub> </h2>
            <hr />
            <div>
              <p>
                Permitted
                <br />
                To
                <br />
                Upload
                <br />
                Maximum
                <br />
                15 Parts
              </p>
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
