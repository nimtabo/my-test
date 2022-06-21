import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ setShowAddPart, showAddPart }) => {
  const [email, setEmail] = useState('')

  const token = useSelector(state => state.token)

  const onSubmit = async () => {
    if (!email) {
      return toast.error("Email fields required")
    }
    try {
      const user = await axios.post(`/user/add_role`,
        { email, role: 0, profile: 0 }, {
        headers: { Authorization: token }
      })
      toast.success(user.data.msg)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  return (
    <div className="modal admin_team">
      {/* product_forms_rwaper */}
      <div className="modal-content">
        <span onClick={() => { setShowAddPart(!showAddPart) }} className="close">&times;</span>
        <p>Invite New Seller</p>
        <form className="modal_edit_container" onSubmit={onSubmit}>
          <div className="modal_fields">
          </div>

          <div className="modal_details">
            <div className="shop_form_item">
              <label >Email </label>
              <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

          </div>
        </form>

        <div className="modal_edit_submit">
          <button onClick={onSubmit}>Invite Seller</button>
        </div>
      </div>
    </div >
  )
}

export default Add