import React from 'react'
import { RiVisaLine } from 'react-icons/ri';
import { HiDotsVertical } from 'react-icons/hi'
import { CgAdd } from 'react-icons/cg'
import Dashboard from '../Dashboad'
import './subscription.css'

const Billing = () => {
  return (
    <Dashboard>
      <div className='subscription_window'>
        <div className='billing_tittle'><h2>Billing Details</h2></div>
        <div className='billing_cards'>
          <div className='billing_card'>
            <div className='upper_section'>
              <div className='logo_edit'>
                <span>
                  <RiVisaLine />
                </span>
                <span>
                  <HiDotsVertical />
                  <button>edit</button>
                </span>
              </div>
              <div className='card_number'>
                <span>***</span><span>***</span><span>***</span><span>3819</span>
              </div>
            </div>
            <div className='card_footer'>
              <span className='card_priority'>
                <span>Priority</span>
                <span>PRIMARY</span>
              </span>
              <span className='card_expire'>
                <span>Expire</span>
                <span>08/25</span>
              </span>
            </div>


          </div>
          <div className='billing_card'>
            <div className='add_card'>
              <div><CgAdd /></div>
              <div>Add New Card</div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}
export default Billing