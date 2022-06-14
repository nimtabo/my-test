import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BiTrash } from 'react-icons/bi'
import { MdAdd, MdOutlineEdit } from 'react-icons/md'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../redux/actions/usersAction'
import './styles.css'

const TeamMembers = () => {
  const [callback, setCallback] = useState(false)

  const users = useSelector(state => state.users)
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  const dispatch = useDispatch()

  const { user, isAdmin } = auth

  useEffect(() => {
    console.log(users)
    if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res))
      })
    }
  }, [token, isAdmin, dispatch, callback])

  return (
    <div className='admin_sellers_page'>
      <div className='admin_sellers_page_headers buyers admin_team'>
        <h2>Team Members <span>12 users</span></h2>

        <div className='admin_team_add'>
          <button> <MdAdd /> Add User</button>
        </div>
      </div>

      {isAdmin &&
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
              {
                users.map(user => {
                  {
                    return user.role === 1 &&
                      <tr key={user._id}>
                        <td><input type='checkbox' /></td>
                        <td>
                          <span className='team_profile_pic'>
                            <img src={user.avatar} alt='user' />
                          </span>
                          {user.store}
                        </td>
                        <td>{user.email} <br /> {user.phone}</td>
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
                  }
                })
              }
            </tbody>
          </table>
        </div>

      }
      <div className='admin_table_pagnation'>
        <div className="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a className="active" href="#">2</a>
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