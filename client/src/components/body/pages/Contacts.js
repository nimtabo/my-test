import React from 'react'
import './contact.css'
import address from '../../../img/address.svg'
import phone from '../../../img/phone.svg'
import email from '../../../img/email.svg'

const Contacts = () => {
  return (
    <div className="contacts-page">
      <div className="contacts-title">
        <h1>Contacts</h1>
      </div>

      <div className="contacts-content">
        <div className="contact-item">
          <div className="contact-circle">
            <img src={address} alt="address-image" />
          </div>
          <h3>ADDRESS</h3>
          <p>California,USA</p>
        </div>

        <div className="contact-item">
          <div className="contact-circle">
            <img src={phone} alt="phone-image" />
          </div>
          <h3>PHONE</h3>
          <p>+1-(123)-234567</p>
        </div>

        <div className="contact-item">
          <div className="contact-circle">
            <img src={email} alt="email-image" />
          </div>
          <h3>EMAIL</h3>
          <p>support@domain.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contacts
