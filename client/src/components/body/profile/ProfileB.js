import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { isLength, isMatch } from '../../utils/validation/Validation'
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/usersAction'

// 
// import { CustomDialog, useDialog } from 'react-st-modal';
import { ModalContent, ModalFooter, ModalButton, useDialog, CustomDialog, Prompt, Alert } from 'react-st-modal';

const initialState = {
  store: '',
  city: '',
  state: '',
  storeWebsite: '',
  phone: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

// firstName, lastName, phone, store, street, city, zipcode, state, storeWebsite
function Profile() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  const users = useSelector(state => state.users)

  const { user, isAdmin } = auth
  const [data, setData] = useState(initialState)
  const { phone, store, city, state, storeWebsite, password, cf_password, err, success } = data

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

  const changeAvatar = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]

      if (!file) return setData({ ...data, err: "No files were uploaded.", success: '' })

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: '' })

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return setData({ ...data, err: "File format is incorrect.", success: '' })

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload_avatar', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })

      setLoading(false)
      setAvatar(res.data.url)

    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  const updateInfor = () => {
    try {
      axios.patch('/user/update', {
        avatar: avatar ? avatar : user.avatar,
        phone: phone ? phone : user.phone,
        store: store ? store : user.store,
        city: city ? city : user.city,
        state: state ? state : user.state,
        storeWebsite: storeWebsite ? storeWebsite : user.storeWebsite,
      }, {
        headers: { Authorization: token }
      })

      setData({ ...data, err: '', success: "Updated Success!" })
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  const updatePassword = ({ password, cf_password }) => {
    if (isLength(password))
      return setData({ ...data, err: "Password must be at least 6 characters.", success: '' })

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: '' })

    try {
      axios.post('/user/reset', { password }, {
        headers: { Authorization: token }
      })

      setData({ ...data, err: '', success: "Updated Success!" })
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  const handleUpdate = () => {
    if (avatar || phone) updateInfor()
    if (password) updatePassword()
  }

  const handleDelete = async (id) => {
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

    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Admin Profile" : "My Profile"}</h2>

          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input type="file" name="file" id="file_up" onChange={changeAvatar} />
            </span>
          </div>

          {/*  */}

          {/*  */}

          <div className="form-group">
            <label htmlFor="store">My Store Name</label>
            <input type="text" name="store" id="store" defaultValue={user.store}
              placeholder="Your store name" onChange={handleChange} />
          </div>

          {/* ADDRESS */}



          <div className="form-group">
            <label htmlFor="storeWebsite">Store Website</label>
            <input type="text" name="storeWebsite" id="storeWebsite" defaultValue={user.storeWebsite}
              placeholder="Store Website" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" defaultValue={user.email}
              placeholder="Your email address" disabled />
          </div>

          <div className="col-double">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" name="phone" id="phone" defaultValue={user.phone}
                placeholder="Your Phone" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Fiaraa Customer ID</label>
              <input type="text" name="phone" id="phone" defaultValue={user.code}
                placeholder="Your Fiaraa Customer ID" onChange={handleChange} disabled />
            </div>
          </div>

          <div className="col-double">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <select name="city" value={user.city} onChange={handleChange}>
                <option value="0">Select city</option>
                <option value="LA">LA</option>
                <option value="NY">NY</option>
                <option value="OH">OH</option>
                <option value="CH">CH</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select name="state" value={user.state} onChange={handleChange}>
                <option value="0">Select state</option>
                <option value="LA">LA</option>
                <option value="NY">NY</option>
                <option value="OH">OH</option>
                <option value="CH">CH</option>
              </select>
            </div>

          </div>





          <div className="col-double">
            {/* <button disabled={loading} onClick={updateInfor}>Edit</button> */}
            <div></div>
            <button disabled={loading} onClick={updateInfor}>Update</button>
          </div>

          {/*  */}


          {/* <div className="change_password">
            <h2>RESET PASSWORD</h2>

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

            <div>
              <em style={{ color: "crimson" }}>
                * If you update your password here, you will not be able
                to login quickly using google and facebook.
              </em>
            </div>

            <button disabled={loading} onClick={updatePassword}>Reset Password</button>
          </div> */}

          <div>
            <button
              onClick={async () => {
                const result = await CustomDialog(<CustomDialogContent
                  // handleChange={handleChange}
                  updatePassword={updatePassword}
                />, {
                  title: 'RESET PASSWORD',
                  showCloseIcon: true,
                  isCanClose: false,
                  isBodyScrollLocked: false,
                });
              }}
            >
              RESET PASSWORD
            </button>
          </div>

        </div>




        {/* DIV @ */}
      </div>
    </>
  )
}


function CustomDialogContent({ updatePassword, }) {
  const dialog = useDialog();

  const [value, setValue] = useState();
  const [data, setData] = useState({
    password: '',
    cf_password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleClick = () => {
    updatePassword(data)
    // console.log({ data })
  }
  return (
    <div>
      <ModalContent>
        <div>New Password:</div>
        <label>

          <input
            type="password" name="password" id="password"
            placeholder="Your password" onChange={handleChange}
          />
        </label>
      </ModalContent>
      <ModalContent>
        <div>Confirm New Password:</div>
        <label>

          <input
            type="password" name="cf_password" id="cf_password"
            placeholder="Confirm password" onChange={handleChange}
          />
        </label>
      </ModalContent>
      <ModalFooter>
        <ModalButton
          onClick={() => {
            handleClick()
            dialog.close(value);
          }}
        >
          Reset password
        </ModalButton>
      </ModalFooter>
    </div>
  );
}

export default Profile
