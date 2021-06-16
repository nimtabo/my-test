import React from 'react'
import './webservices.css'

function WebServices() {
  return (
    <div className="webservices-page">
      <div className="page-tittle">
        <h2>Website Services In Detail</h2>
      </div>
      <div className="contents">
        <h3>We will be happy to create a website for your business</h3>

        <div className="details">
          <p>
            We are providing website based on two different price plan for your business and you have to do an agreement to be with us for atleast one year.
          </p>
          <p>
            Basic plan(17.77$/month)
            * In this plan you will get a website consist of landing page, contact us page, about us page, terms and conditions page.
            * Your website url will be a subdomain. e.g.(www.storename.karpart.com)
            * We can do upto 2 changes per month in website(like updating any content etc.).  For additional changes you have to pay 3$ per update.
          </p>
          <p>
            Pro plan(17.77$/month)
            * In this plan you will get a website consist of landing page, contact us page, about us page, terms and conditions page.
            * Your website url will be a new domain. e.g.(www.storename.com)
            * We can do upto 2 changes per month in website(like updating any content etc.).  For additional changes you have to pay 3$ per update.
          </p>

          <p>
            Nobody knows your business better than you and website is a reflection of your business. After successfully choosing a plan and making a payment our developer will contact you through email and will gather some basic informations related to your business.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WebServices
