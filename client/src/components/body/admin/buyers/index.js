import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiCalendar } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../redux/actions/usersAction'
import Add from './Add'
import Edit from './Edit'
import './styles.css'

const Buyers = () => {
  const [callback, setCallback] = useState(false)
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

  return (
    <div className='admin_sellers_page'>
      {/* MODALS START */}
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
      {/* MODALS END */}
      <div className='admin_sellers_page_headers buyers'>
        <h2>Buyers</h2>

        <span className='admin_sellers_headers_search'>
          <span>
            <FiSearch />
          </span>
          <input type='search' placeholder='Search' />
        </span>

        <div className='sellers_totals'>
          <span>Total</span>
          <span>455</span>
        </div>

        <div className='date_range'>
          <FiCalendar /> <span>1 Jan 22 - 13 Jan 22</span>
        </div>
      </div>

      <div className='admin_buyers_add'>
        <button onClick={() => { setShowAddPart(!showAddPart) }}> <MdAdd /> Add buyer</button>
      </div>

      <div className="tableFixHead">
        <table>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Name</th>
              <th>Buyer Id</th>
              <th>Email Address</th>
              <th>Registered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return user.profile === 1 && (<tr key={user._id}>
                  <td><input type='checkbox' /></td>
                  <td>Sellers Have no Names</td>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><BiDotsHorizontalRounded /></td>
                </tr>
                )
              })
            }
          </tbody>

        </table>
      </div>
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

export default Buyers