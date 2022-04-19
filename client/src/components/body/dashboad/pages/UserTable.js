import React from 'react'
import './table.css'

const UserTable = () => {
  return (
    <div>
      <div className="table_controls">

        <div className="table_search">
          <div>
            <input type="checkbox" />
            <span>admins</span>
          </div>

          <div>
            <input type="checkbox" />
            <span>All users</span>
          </div>

          <div>
            <input type="checkbox" />
            <span>Sellers</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Buyers</span>
          </div>

          <div>
            <input type="search" placeholder="search user email" />
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
                <option>Block</option>
                <option>Suspend</option>
              </select>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>nicklas Doe</td>
            <td>nicklas@gmail.com</td>
            <td>yes</td>
            <td><button>Edit</button> <button>Delete</button> <button>More info</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>nicklas Doe</td>
            <td>nicklas@gmail.com</td>
            <td>yes</td>
            <td><button>Edit</button> <button>Delete</button> <button>More info</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>nicklas Doe</td>
            <td>nicklas@gmail.com</td>
            <td>yes</td>
            <td><button>Edit</button> <button>Delete</button> <button>More info</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>nicklas Doe</td>
            <td>nicklas@gmail.com</td>
            <td>yes</td>
            <td><button>Edit</button> <button>Delete</button> <button>More info</button></td>
          </tr>



        </tbody>
      </table>

    </div>
  )
}

export default UserTable
