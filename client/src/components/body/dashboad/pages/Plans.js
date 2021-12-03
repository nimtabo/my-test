import React from 'react'
import SideNav from '../sidenav/SideNav'
// **********
import './shop.css'


const Plans = ({ handleOpenNav, width }) => {
  return (
    <div className="dashboad_page">
      <SideNav className="side_menu" handleOpenNav={handleOpenNav} width={width} />

      <div id="main">
        <button className="openbtn" onClick={handleOpenNav}>☰ My Store</button>
        <div className="shop_window">
          {/* <h1>Subscriptions</h1> */}

          {/* **** */}
          <div className="pricing-page">
            <div className="pricing-title">
              <h1>Subscriptions</h1>
            </div>

            <div className="pricing-plan-parts-container">
              <div className="pricing-plan-tittle">
                <h2>Pricing and Plans For Used Auto <br /> <span>Parts Sellers</span> </h2>
              </div>
              <div className="pricing-plan-parts">
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
                      12 Parts
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
                      20 Parts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* **** */}
        </div>
      </div>
    </div>
  )
}

export default Plans
