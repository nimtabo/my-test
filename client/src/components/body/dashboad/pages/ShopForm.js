import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showSuccessMsg, showErrMsg } from '../../../utils/notification/Notification'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../redux/actions/usersAction'

import './shop.css'


const initialState = {
  name: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function ShopForm() {
  // *********
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  const users = useSelector(state => state.users)

  const { user, isAdmin } = auth
  const [data, setData] = useState(initialState)
  const { name, password, cf_password, err, success } = data

  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res))
      })
    }
  }, [token, isAdmin, dispatch, callback])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }

  // **********
  return (
    <>
      {/* **** */}
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Shop Details" : "User Profile"}</h2>


          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" defaultValue={user.name}
              placeholder="Your name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" defaultValue={user.email}
              placeholder="Your email address" disabled />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input type="password" name="password" id="password"
              placeholder="Your password" value={password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input type="password" name="cf_password" id="cf_password"
              placeholder="Confirm password" value={cf_password} onChange={handleChange} />
          </div>


          <button disabled={loading}>Create</button>
        </div>

        {/* <div className="col-left">
         
        </div> */}

      </div>

    </>
  )
}

export default ShopForm
