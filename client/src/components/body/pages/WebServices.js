import React from 'react'
import './webservices.css'

function WebServices() {
  return (
    <div className="webservices-page">
      <div className="page-tittle">
        <h2>Website Services In Detail</h2>
      </div>
      <div className="webservices_contents">
        <h3>Fiaraa will be happy to create a website for your business</h3>

        <div className="webservices_details">
          <p>
            We are providing websites based on two different price plan for your business on a contractual agreement for at least one year.
          </p>

          <p>Basic plan($17.77 / month)</p>
          <ul>
            <li>In this plan you will get a website consisting of a landing, contact us, about us, terms and conditions pages.</li>
            <li>Your website url will be a subdomain.e.g.(www.storename.fiaraa.com)</li>
            <li>We can do upto 2 changes per month in website(like updating any content etc.).For additional changes you have to pay $3 per update.</li>
          </ul>

          <p>Pro plan($27.77 / month)</p>
          <ul>
            <li>In this plan you will get a website consisting of a landing, contact us, about us, terms and conditions pages.</li>
            <li>Your website url will be a new domain.e.g.(www.storename.com)</li>
            <li>We can do upto 2 changes per month in website(like updating any content etc.).For additional changes you have to pay $3 per update.</li>
          </ul>

          <p>
            Nobody knows your business better than you, website is a reflection of your business.After successfully choosing a plan and making a payment our developer will contact you through email and will gather some basic informations related to your business.          </p>
        </div>
      </div>
    </div>
  )
}

export default WebServices
