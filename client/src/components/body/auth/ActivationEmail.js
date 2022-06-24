import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'

function ActivationEmail() {
    const { activation_token } = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    const history = useHistory()

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', { activation_token })
                    setSuccess(res.data.msg)
                    setTimeout(() => {
                        setSuccess("")
                        history.push('/login')
                    }, 3000);
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                    return setTimeout(() => {
                        setErr('')
                    }, 3000);
                }
            }
            activationEmail()
        }
    }, [activation_token])

    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    )
}

export default ActivationEmail
