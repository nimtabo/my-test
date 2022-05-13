import React from 'react'
import './checkout.css'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'

const Checkout = () => {
  return (
    <div className="pricing-page">
      <div className="pricing-plan-parts-container checkout">
        <h1>Review & Complete</h1>

        <div className='checkout_items'>
          <div className='checkout_item'>
            <h2>Client Information</h2>
            <div className='form_items'>
              <div className='form_item'>
                <label>First Name* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Last Name* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Store Name* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Phone Number* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>State* :</label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>City* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Zip Code* : </label>
                <input type='text' name='' />
              </div>
            </div>
          </div>
          <div className='checkout_item'>
            <h2>Payment Information</h2>
            <div className='form_items'>
              <div className='form_item'>
                <label>Card Number* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Cardholder Name* :</label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Card Expiration* : </label>
                <select>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                </select>
                <select>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                </select>
              </div>
              <div className='form_item'>
                <label>CVV Code* : </label>
                <input className='cvv' type='text' name='' />
              </div>
            </div>

            <div className='form_items'>
              <p>
                <input type='checkbox' name='same' />
                Billing Address is the same as given in the Contact Information
                <span><FaCcVisa /> <FaCcMastercard /></span>
              </p>
            </div>

            <div className='form_items'>
              <div className='form_item'>
                <label>Address* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>State* :</label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Phone Number* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>City* : </label>
                <input type='text' name='' />
              </div>
              <div className='form_item'>
                <label>Zip Code* : </label>
                <input className='cvv' type='text' name='' />
              </div>
            </div>
          </div>
          <div className='checkout_item'>
            <h2>Purchase  Information</h2>
            <div className='form_items plan_section'>
              <div className='form_item'>
                <label>Plan : </label>
                <select>
                  <option>Individual plan</option>
                  <option>Auto shop plan</option>
                  <option>Dealership plan</option>
                </select>
              </div>
              <div className='form_item'>
                <label>Period :</label>
                <select>
                  <option>12months - BEST DEAL</option>
                  <option>Auto shop plan</option>
                  <option>Dealership plan</option>
                </select>
              </div>
              <div className='form_item'>
                <label>Price : </label>
                <label>$29.99/mo    <span>$27.99/mo</span></label>
              </div>
            </div>
            <div className='form_items'>
              <p>* The special initial price applies for the first invoice only. Once your initial term is over regular renewal prices apply.</p>
            </div>
          </div>
          <div className='checkout_item'>
            <div className='form_items'>
              <div className='form_item'>
                <label>Total:</label>
              </div>
              <div className='form_item'>
                <span className='green_text'>$335.88</span>
              </div>
            </div>
          </div>
          <div className='checkout_item'>
            <div className='form_items'>
              <p>
                <input type='checkbox' name='same' />
                I confirm that I have read and agree to the Fiaraa Terms of Service and Privacy Policy and I understand that the Fiaraa services are provided on a subscription basis and are set to auto-renew for the same period they were initially ordered for.
                Renewal settings can be managed in the Fiaraa Client area.
              </p>
            </div>
            <div className='form_items'>
              <p>
                <input type='checkbox' name='same' />
                I would like to receive information about service updates and new features, special offers, and educational content by email.
              </p>
            </div>
          </div>

          <div className='checkout_pay_btn'>
            <button>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout