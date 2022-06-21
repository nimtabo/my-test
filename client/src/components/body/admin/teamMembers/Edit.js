import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Edit = ({ setShowEdit, showEdit, user }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(0)

  const token = useSelector(state => state.token)


  const onSubmit = async () => {
    // if (!name || !email) {
    //   return toast.error("All input fields required")
    // }
    const userData = {
      name: name || user.name,
      email: email || user.email,
      department: role || user.department,
      id: user._id
    }
    try {
      const user = await axios.patch(`/user/update_profile`,
        userData, {
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
        <span onClick={() => { setShowEdit(!showEdit) }} className="close">&times;</span>
        <p>Edit Team Member</p>
        <form className="modal_edit_container" onSubmit={onSubmit}>
          <div className="modal_fields">
          </div>

          <div className="modal_details">
            <div className="shop_form_item">
              <label >Name: </label>
              <input type="text" name="name" defaultValue={user && user.name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="shop_form_item">
              <label >Email </label>
              <input type="text" name="email" defaultValue={user && user.email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="shop_form_item">
              <label >Role </label>
              <select defaultValue={user && user.department} onChange={e => setRole(e.target.value)}>
                <option value={1}>Admin</option>
                <option value={0}>Marketing</option>
              </select>
            </div>

          </div>
        </form>

        <div className="modal_edit_submit">
          <button onClick={onSubmit}>Edit Member</button>
        </div>
      </div>
    </div >
  )
}

export default Edit