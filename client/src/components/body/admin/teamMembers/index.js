import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BiTrash } from 'react-icons/bi'
import { MdAdd, MdOutlineEdit } from 'react-icons/md'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../redux/actions/usersAction'
import Add from './Add'
import Edit from './Edit'
import './styles.css'

const TeamMembers = () => {
  const [callback, setCallback] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAddPart, setShowAddPart] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const users = useSelector(state => state.users)
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  const dispatch = useDispatch()

  const { user, isAdmin } = auth

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res))
      })
    }
  }, [token, isAdmin, dispatch, callback])

  const handleDelete = async (id) => {
    console.log("DELETE")
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true)
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token }
          })
          setLoading(false)
          setCallback(!callback)
        }
      }
      toast.error("You cannot Delete Your Admin Profile")

    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  return (
    <div className='admin_sellers_page'>
      <ToastContainer />
      {loading && <h3>Loading.....</h3>}
      <div id="add_parts_container"
        style={showAddPart ? { display: "block" } : { display: "none", }}>
        <Add
          setShowAddPart={setShowAddPart}
          showAddPart={showAddPart}
        />
      </div>
      <div id="add_parts_container"
        style={showEdit ? { display: "block" } : { display: "none", }}>
        <Edit
          setShowEdit={setShowEdit}
          showEdit={showEdit}
        />
      </div>
      <div className='admin_sellers_page_headers buyers admin_team'>
        <h2>Team Members <span>{users.filter(u => u.role === 1).length} users</span></h2>

        <div className='admin_team_add'>
          <button onClick={() => { setShowAddPart(!showAddPart) }}> <MdAdd /> Add User</button>
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
                            <option>Marketing</option>
                            <option>Finance</option>
                          </select>
                        </td>
                        <td>{new Date(user.createdAt).toDateString()}</td>
                        <td className='table_editors' onClick={() => handleDelete(user._id)}> <BiTrash /></td>
                        <td onClick={() => { setShowEdit(!showEdit) }} className='table_editors'><MdOutlineEdit /></td>
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