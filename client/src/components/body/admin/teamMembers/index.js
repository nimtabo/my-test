import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { MdAdd, MdOutlineEdit } from 'react-icons/md'
import './styles.css'

const TeamMembers = () => {
  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers buyers admin_team'>
        <h2>Team Members <span>12 users</span></h2>

        <div className='admin_team_add'>
          <button> <MdAdd /> Add User</button>
        </div>
      </div>

      <div className="tableFixHead team_members">
        <table>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Name</th>
              <th>Details</th>
              <th>Role</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>
                <span className='team_profile_pic'>
                  {/* <img src='' alt='user profile' /> */}
                </span>
                Sambit Mohanty
              </td>
              <td>smohanty@fiaraa.com <br /> +91 7978709633</td>
              <td>
                <select>
                  <option>Admin</option>
                  <option>buyer</option>
                  <option>seller</option>
                </select>
              </td>
              <td>11-05-2022</td>
              <td> <BiTrash /> <MdOutlineEdit /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>
                <span className='team_profile_pic'>
                  {/* <img src='' alt='user profile' /> */}
                </span>
                Sambit Mohanty
              </td>
              <td>smohanty@fiaraa.com <br /> +91 7978709633</td>
              <td>
                <select>
                  <option>Admin</option>
                  <option>buyer</option>
                  <option>seller</option>
                </select>
              </td>
              <td>11-05-2022</td>
              <td> <BiTrash /> <MdOutlineEdit /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>
                <span className='team_profile_pic'>
                  {/* <img src='' alt='user profile' /> */}
                </span>
                Sambit Mohanty
              </td>
              <td>smohanty@fiaraa.com <br /> +91 7978709633</td>
              <td>
                <select>
                  <option>Admin</option>
                  <option>buyer</option>
                  <option>seller</option>
                </select>
              </td>
              <td>11-05-2022</td>
              <td> <BiTrash /> <MdOutlineEdit /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>
                <span className='team_profile_pic'>
                  {/* <img src='' alt='user profile' /> */}
                </span>
                Sambit Mohanty
              </td>
              <td>smohanty@fiaraa.com <br /> +91 7978709633</td>
              <td>
                <select>
                  <option>Admin</option>
                  <option>buyer</option>
                  <option>seller</option>
                </select>
              </td>
              <td>11-05-2022</td>
              <td> <BiTrash /> <MdOutlineEdit /></td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>
                <span className='team_profile_pic'>
                  {/* <img src='' alt='user profile' /> */}
                </span>
                Sambit Mohanty
              </td>
              <td>smohanty@fiaraa.com <br /> +91 7978709633</td>
              <td>
                <select>
                  <option>Admin</option>
                  <option>buyer</option>
                  <option>seller</option>
                </select>
              </td>
              <td>11-05-2022</td>
              <td> <BiTrash /> <MdOutlineEdit /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='admin_table_pagnation'>
        <div class="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a class="active" href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
  )
}

export default TeamMembers