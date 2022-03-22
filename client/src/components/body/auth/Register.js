import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch, validatePhone, formatPhoneNumber, is_url } from '../../utils/validation/Validation'
import { getCities, getStates, getCityState } from '../../utils/state_cities/index'

const initialState = {
    phone: '',
    store: '',
    city: '',
    state: '',
    storeWebsite: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)
    const [cities, setCities] = useState([])

    const { store, phone, city, state, storeWebsite, email, password, cf_password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        if (name === "phone") {
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            return setUser({ ...user, [name]: formattedPhoneNumber, err: '', success: '' })
        }
        if (name === "state") {
            setCities([...getCities(e.target.value)])
        }
        setUser({ ...user, [name]: value, err: '', success: '' })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        console.log(user)
        if (isEmpty(store) || isEmpty(phone) || isEmpty(city) || isEmpty(state) || isEmpty(storeWebsite) || isEmpty(password)) {
            setUser({ ...user, err: "Please fill in all fields.", success: '' })
            return setTimeout(() => {
                setUser({ ...user, err: '', success: '' })
            }, 5000);
        }

        if (!isEmail(email)) {
            setUser({ ...user, err: "Invalid emails.", success: '' })
            return setTimeout(() => {
                setUser({ ...user, err: '', success: '' })
            }, 5000);
        }

        if (phone) {
            if (!validatePhone(phone)) {
                setUser({ ...user, err: 'Enter valid Phone Number', success: "" })
                return setTimeout(() => {
                    setUser({ ...user, err: '', success: '' })
                }, 5000);
            }
        }

        if (storeWebsite) {
            if (!is_url(storeWebsite)) {
                setUser({ ...user, err: 'Enter valid Website', success: "" })
                return setTimeout(() => {
                    setUser({ ...user, err: '', success: '' })
                }, 5000);
            }
        }

        if (isLength(password)) {
            setUser({ ...user, err: "Password must be at least 6 characters.", success: '' })
            return setTimeout(() => {
                setUser({ ...user, err: '', success: '' })
            }, 5000);
        }

        if (!isMatch(password, cf_password)) {
            setUser({ ...user, err: "Password did not match.", success: '' })
            return setTimeout(() => {
                setUser({ ...user, err: '', success: '' })
            }, 5000);
        }

        try {
            const res = await axios.post('/user/register', {
                store, phone, city, state, storeWebsite, email, password
            })

            setUser({ ...user, err: '', success: res.data.msg })
            return setTimeout(() => {
                setUser({ ...user, err: '', success: '' })
            }, 5000);
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
            return setTimeout(() => {
                setUser({ ...user, err: '', success: '' })
            }, 5000);
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
                    <label htmlFor="state">State</label>
                    <select name="state" value={state} onChange={handleChangeInput}>
                        {
                            getStates().map(stt => {
                                return <option key={stt} value={stt}>{stt}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <select name="city" value={city} onChange={handleChangeInput}>
                        {
                            cities && cities.map(cty => {
                                return <option key={cty} value={cty}>{cty}</option>
                            })
                        }
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
