import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import Dashboard from '../Dashboad'
import './subscription.css'

const PayHistory = () => {
  return (
    <Dashboard>
      <div className='subscription_window'>
        <div className='billing_tittle'><h2>Billing Details</h2></div>

        <div className='pay_history'>
          <div className='dates'>
            <div className='from_date'>
              <label>From</label>
              <span>
                <FiCalendar />
                <input type='date' />
              </span>
            </div>
            <div className='to_date'>
              <label>To</label>
              <span>
                <FiCalendar />
                <input type='date' />
              </span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th colSpan='2'>Date</th>
                <th colSpan='5'>Transaction</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan='2'>07/03/2022</td>
                <td colSpan='5'>Bronze Plan (Auto parts)</td>
                <td>$9.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  )
}

export default PayHistory