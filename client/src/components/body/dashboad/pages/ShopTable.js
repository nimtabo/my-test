import React from 'react'
import './table.css'

const ShopTable = () => {
  return (
    <div>
      <div className="table_controls">

        <div className="table_search">
          <div>
            <select>
              <option>city</option>
              <option>city</option>
              <option>city</option>
            </select>
          </div>

          <div>
            <select>
              <option>stateProvince</option>
              <option>stateProvince</option>
              <option>stateProvince</option>
            </select>
          </div>

          <div>
            <select>
              <option>shipmentMethod</option>
              <option>DHL</option>
              <option>POST</option>
            </select>
          </div>

          <div>
            <select>
              <option>paymentMethod</option>
              <option>PayPAl</option>
              <option>Cash</option>
              <option>Bank</option>
            </select>
          </div>

          <div>
            <input type="search" placeholder="search shop by name" />
          </div>

        </div>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>
              <select>
                <option>Select Action</option>
                <option>Delete</option>
                <option>suspend</option>
                <option>block</option>
                <option>hide</option>
                <option>unhide</option>
              </select>
            </th>
            <th>name</th>
            <th>description</th>
            <th>address</th>
            <th>phone</th>
            <th>email</th>
            <th>city</th>
            <th>stateProvince</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>shop name</td>
            <td>shop description</td>
            <td>shop address</td>
            <td>01112455</td>
            <td>shop@mail.com</td>
            <td>New York</td>
            <td>New York</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>

          <tr>
            <td><input type="checkbox" /></td>
            <td>shop name</td>
            <td>shop description</td>
            <td>shop address</td>
            <td>01112455</td>
            <td>shop@mail.com</td>
            <td>New York</td>
            <td>New York</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>

          <tr>
            <td><input type="checkbox" /></td>
            <td>shop name</td>
            <td>shop description</td>
            <td>shop address</td>
            <td>01112455</td>
            <td>shop@mail.com</td>
            <td>New York</td>
            <td>New York</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>

          <tr>
            <td><input type="checkbox" /></td>
            <td>shop name</td>
            <td>shop description</td>
            <td>shop address</td>
            <td>01112455</td>
            <td>shop@mail.com</td>
            <td>New York</td>
            <td>New York</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>

        </tbody>
      </table>

    </div>
  )
}

export default ShopTable
