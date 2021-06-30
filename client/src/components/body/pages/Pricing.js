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
          <h3>Pricing and Plans For Used Auto Parts Sellers</h3>
        </div>
        <div className="pricing-plan-parts">
          <div className="price-card">
            <h3>Free</h3>
            <h3>$0/month</h3>
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
            <h3>$10/month</h3>
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
            <h3>$15/month</h3>
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
            <h3>$20/month</h3>
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
          <h3>Pricing and Plans For Website Services</h3>
        </div>
        <div className="pricing-plan-parts">
          <div className="price-card">
            <h3>Basic</h3>
            <h3>$17.77/month</h3>
            <hr />
            <p>
              Your website url will be a subdomain.
              <br />
              (e.g. yourstorename.carparts.com)
              <br />
              + 2 free changes per month
              <br />
              (additional change $3)
            </p>
          </div>

          <div className="price-card">
            <h3>Pro</h3>
            <h3>$27.77/month</h3>
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
