import React from 'react'
import { BsStar, BsGlobe2 } from 'react-icons/bs'
import Dashboard from '../Dashboad'
import './subscription.css'

const Renewals = () => {
  return (
    <Dashboard>
      <div className='subscription_window'>
        <div className='billing_tittle'><h2>Renewals</h2></div>
        <div className='autoparts_plan'>
          <div className='star'><BsStar /></div>
          <div className='plan_name'>
            <span>Auto Parts Plan</span>
            <span>Bronze Plan - Expires Jul 2, 2022</span>
          </div>
          <div className='select_plan'>
            <select>
              <option>1 month - $9.99/mo</option>
              <option>1 month - $29.99/mo</option>
              <option>1 month - $49.99/mo</option>
            </select>
          </div>
          <div className='plan_tax'>
            $9.99 EXCL. TAX
          </div>
          <button>Renew</button>
        </div>

        <div className='autoparts_plan'>
          <div className='star'><BsGlobe2 /></div>
          <div className='plan_name'>
            <span>Website Plan</span>
            <span>Basic Plan - Expires Jul 2, 2022</span>
          </div>
          <div className='select_plan'>
            <select>
              <option>1 month - $17.99/mo</option>
              <option>1 month - $25.99/mo</option>
            </select>
          </div>
          <div className='plan_tax'>
            $9.99 EXCL. TAX
          </div>
          <button>Renew</button>
        </div>

      </div>
    </Dashboard>
  )
}

export default Renewals