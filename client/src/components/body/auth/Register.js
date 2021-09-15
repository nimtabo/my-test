import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/validation/Validation'


const initialState = {
    phone: '',
    store: '',
    city: '',
    storeWebsite: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const { store, phone, city, storeWebsite, email, password, cf_password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(store) || isEmpty(phone) || isEmpty(city) || isEmpty(storeWebsite) || isEmpty(password))
            return setUser({ ...user, err: "Please fill in all fields.", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid emails.", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be at least 6 characters.", success: '' })

        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: "Password did not match.", success: '' })

        try {
            const res = await axios.post('/user/register', {
                store, phone, city, storeWebsite, email, password
            })

            setUser({ ...user, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                        value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="store">Store Name</label>
                    <input type="text" placeholder="Give Your business a name" id="store"
                        value={store} name="store" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" placeholder="Enter your Phone number" id="phone"
                        value={phone} name="phone" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="storeWebsite">Store Website</label>
                    <input type="text" placeholder="Enter your storeWebsite if you have one" id="storeWebsite"
                        value={storeWebsite} name="storeWebsite" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <select name="city" value={city} onChange={handleChangeInput}>
                        <option value="0">Select city</option>
                        <option value="LA">LA</option>
                        <option value="NY">NY</option>
                        <option value="OH">OH</option>
                        <option value="CH">CH</option>
                    </select>
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
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
