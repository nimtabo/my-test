const Users = require('../models/userModel')
const Shop = require('../models/shopModel')
const bcrypt = require('bcrypt')
const cryptoRandomString = require('crypto-random-string')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const validators = require('../helpers/validators')

const { google } = require('googleapis')
const { OAuth2 } = google.auth
const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const { CLIENT_URL } = process.env

const userCtrl = {
    register: async (req, res) => {
        try {
            const { store, phone, city, state, email, password } = req.body

            if (!store || !phone || !city || !state || !email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields." })
            }

            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid emails." })
            }

            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: "This email already exists." })
            }

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                store, phone, city, state, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address", "register")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: "Oops! Something went wrong" })
        }
    },
    registerBuyer: async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                email, password: passwordHash, profile: 1
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address", "register")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { store, phone, city, state, email, password, profile } = user

            const check = await Users.findOne({ email })
            if (check) {
                return res.status(400).json({ msg: "This email already exists." })
            }

            // RANDOM CODE GENERATOR
            const numCode = cryptoRandomString({ length: 6, type: 'numeric' });
            //=> '8314659141'

            const alphaCode = cryptoRandomString({ length: 6, type: 'distinguishable' });
            //=> 'CDEHKM'

            const code = `${alphaCode}${numCode}`;
            // *******************

            const newUser = new Users({
                store, phone, city, state, email, password, code, profile
            })

            const savedUser = await newUser.save()

            if (!store || !phone || !city || !state) {
                return res.json({ msg: "Account has been activated!" })
            }
            // ******* CREATE SHOP/STORE ************
            // **************************************
            const newShop = new Shop({
                name: store,
                phone,
                email,
                city,
                stateProvince: state,
                owner: savedUser._id,
            });

            const savedShop = await newShop.save();
            const updateUserShops = await Users.findByIdAndUpdate(
                savedUser._id,
                { shop: savedShop._id }
            )
            // ********** THEN **********************

            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
            // return res.status(400).json({ msg: "Activation link expired!, Please register again" })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password", "reset")
            res.json({ msg: "Please check your email, to Re-set the password." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { avatar, phone, store, city, state, storeWebsite, email, name, profile } = req.body

            let userRole = await Users.findById(req.user.id)

            if (userRole.role == 1) {
                await Users.findOneAndUpdate({ _id: req.user.id }, {
                    avatar, name, city, state
                })
                return res.json({ msg: "Update Success!" })
            }

            if (Number(profile) === 1) {
                await Users.findOneAndUpdate({ _id: req.user.id }, {
                    avatar, name, city, state
                })
                return res.json({ msg: "Update Success!" })
            }

            if (!validators.validatePhone(phone)) {
                return res.status(401).json({ msg: "Invalid Phone Number" })
            }

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                avatar, phone, store, city, state, storeWebsite,
            })

            // ********* UPDATE STORE ****************
            await Shop.findOneAndUpdate({ owner: req.user.id }, {
                name: store,
                phone,
                email,
                city,
                stateProvince: state,
                website: storeWebsite,
            })

            //   *****************************************

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: 'Server Error' })
        }
    },
    addUsersRole: async (req, res) => {
        try {
            const { name, email, role, department, profile } = req.body

            if (!email)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            const passwordHash = await bcrypt.hash(email, 12)

            const userData = {
                email, password: passwordHash, role: 0
            }

            if (name) {
                userData.name = name,
                    userData.role = 1,
                    userData.department = Number(department)
            } else {
                userData.profile = profile
            }
            const newUser = new Users(userData)
            const savedUser = await newUser.save()


            const url = `${CLIENT_URL}/login`
            let message = `<p>Email: ${email} </p> <p>Password: ${email} </p>`;
            sendMail(email, url, message, "invite")


            res.json({ msg: "Register Success!Invitation Email sent to " + savedUser.email })

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ msg: "Something went wrong" })
        }
    },
    updateProfileRole: async (req, res) => {
        try {
            const { id, name, email, role, department } = req.body

            if (!id)
                return res.status(400).json({ msg: "Invalid Request." })

            if (!email)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ _id: id })
            if (!user) return res.status(400).json({ msg: "This User Does not exists." })


            const userData = {
                email, role: 0
            }

            if (user.role === 1) {
                userData.name = name,
                    userData.role = 1,
                    userData.department = Number(department)
            }

            const savedUser = await Users.findByIdAndUpdate(id, userData, { new: true })

            if (!savedUser) {
                return res.status(400).json({ msg: "Could Not Update User Information." })
            }
            const url = `${CLIENT_URL}/login`
            let message = `<p>Email: ${email} </p> <p>Name: ${name} </p>`;
            sendMail(email, url, message, "update-notification")

            await res.json({ msg: `User Info Update Success! Notification Email sent to ${email}` })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Something went wrong" })
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            // ********* DELETE STORE *********
            await Shop.findOneAndDelete({ owner: req.user.id })

            // ********************************

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req, res) => {
        try {
            const { tokenId } = req.body

            const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

            const { email_verified, email, name, picture } = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

            const user = await Users.findOne({ email })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

                const refresh_token = createRefreshToken({ id: user._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            } else {
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture
                })

                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const { accessToken, userID } = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

            const data = await fetch(URL).then(res => res.json()).then(res => { return res })

            const { email, name, picture } = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ email })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

                const refresh_token = createRefreshToken({ id: user._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            } else {
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture.data.url
                })

                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}





function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '7d' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl