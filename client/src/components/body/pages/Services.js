import React from 'react'
import './services.css'
import services1 from '../../../img/services1.png'
import services2 from '../../../img/services2.png'
import services3 from '../../../img/services3.png'

function Services() {
  return (
    <div className="service-page">
      <div className="service-title">
        <h1>Services Offered</h1>
      </div>

      <div >
        <div className="container-head">
          <h3 className="top-head">FIND YOUR PART</h3>
        </div>
        <div className="container-top">
          <div className="image-side">
            <img src={services1} alt="services1" />
          </div>
          <div className="text-side">
            <p>
              Fiaraa is your one-stop shop for replacement of high quality used OEM automotive parts and
              accessories.
            </p>
            <p>
              Fiaraa is a used auto parts locator through its friendly digital marketplace platform for sellers and
              buyers. Search through live inventories of used car part salvage yards and suppliers online and buy the
              used parts you need for your car. You have a wide selection of used auto parts across the country with
              the best prices to chose from. We provide a no-nonsense to purchasing used auto parts with easy to
              use platform.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="container-head">
          <h3 className="top-head">WEBSITE SERVICES</h3>
        </div>
        <div className="container-top">
          <div className="text-left">
            <p>
              We assist you to "Maximize Your Revenue Through Online Presence"
            </p>
            <p>
              In today’s digital world, your website is the first interaction consumers have with your business.Without
              online exposure in todays digital world it will be harder to reach a wide consumer needs for selling your
              inventory of Used Auto Parts.
            </p>
            <p>
              That's why almost 95% of a user’s first impression relates to web design. It’s also why web design
              services can have an immense impact on your company’s bottom line.
            </p>
            <p>
              That’s why more companies who have no website are being offered WEBSITE SERVICES at a nominal
              monthly subscription rate and an exposure to world - wide customers.Current customers are not only
              reevaluating their website’s design but also partnering with Fiaraa, the web design agency that’s highly
              experienced and here to support you and grow your revenue.            </p>
            <p>
              With over web design development and operations team we're confident we can design a custom
              website that drives sales for your unique business.
            </p>
          </div>
          <div className="image-rigt">
            <img src={services3} alt="services3" />
          </div>
        </div>
      </div>

      <div>
        <div className="container-head">
          <h3 className="top-head">SELL YOUR USED CAR</h3>
        </div>
        <div className="container-top">
          <div className="text-side">
            <p>
              Why should I sell my car on Fiaraa ?
            </p>
            <p>
              Reach millions of customers every day and week looking for cars for sale near you.Get more for your
              used car or truck when you sell it yourself by exposure of your vehicle to our subsribers and public who
              visit our website.
            </p>
            <p>
              List your car for FREE
            </p>
            <p>
              Get a vehicle history report at no additional cost
            </p>
            <p>
              Add up to 10 photos of your car
            </p>
            <p>
              Renew for free as many times as you like every 30 days
            </p>
            <p>
              Use Kelley Blue Book’s trusted vehicle pricing guidance to help you set the right price
              Get double the exposure as we attract our website to thousands of individuals across the globe
            </p>
          </div>
          <div className="image-side">
            <img src={services2} alt="services2" />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Services
