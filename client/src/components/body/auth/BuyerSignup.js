import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/validation/Validation'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


const initialState = {
  email: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function BuyerSignup() {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()

  const { email, password, cf_password, err, success } = user

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }
  // 


  const handleSubmit = async e => {
    e.preventDefault()
    console.log(user)
    if (isEmpty(email) || isEmpty(password))
      return setUser({ ...user, err: "Please fill in all fields.", success: '' })

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: '' })

    if (isLength(password))
      return setUser({ ...user, err: "Password must be at least 6 characters.", success: '' })

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: '' })

    try {
      const res = await axios.post('/user/register/buyer', {
        email, password
      })

      setUser({ ...user, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/user/google_login', { tokenId: response.tokenId })

      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response
      const res = await axios.post('/user/facebook_login', { accessToken, userID })

      setUser({ ...user, error: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <div className="login_page">
      <h2>Sign in</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="text" placeholder="Enter email address" id="email"
            value={email} name="email" onChange={handleChangeInput} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter password" id="password"
            value={password} name="password" onChange={handleChangeInput} />
        </div>

        <div>
          <label htmlFor="cf_password">Confirm Password</label>
          <input type="password" placeholder="Confirm password" id="cf_password"
            value={cf_password} name="cf_password" onChange={handleChangeInput} />
        </div>

        <div className="row">
          <button type="submit">Sign up</button>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </form>

      {/* <div className="hr">OR</div> */}
      <h1 className='or_h'>OR</h1>

      <div className="social">
        <GoogleLogin
          clientId="828047547611-macjd8u3bpju9s91talms294o6vdjh71.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />

        <FacebookLogin
          appId="511837813532775"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />

      </div>

      {/* <p>New Customer? Sign up as a <Link className='link' to="/register">Buyer</Link> or <Link className='link' to="/register">Seller</Link></p> */}
    </div>
  )
}

export default BuyerSignup
