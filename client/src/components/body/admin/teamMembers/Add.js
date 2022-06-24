import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({ setShowAddPart, showAddPart }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(0)

  const token = useSelector(state => state.token)


  const onSubmit = async () => {
    if (!name || !email) {
      return toast.error("All input fields required",{theme: 'colored'})
    }
    try {
      const user = await axios.post(`/user/add_role`,
        { name, email, department: role }, {
        headers: { Authorization: token }
      })
      toast.success(user.data.msg,{theme: 'colored'})
    } catch (error) {
      toast.error(error.response.data.msg,{theme: 'colored'})
    }
  }

  return (
    <div className="modal admin_team">
      {/* product_forms_rwaper */}
      <div className="modal-content">
        <span onClick={() => { setShowAddPart(!showAddPart) }} className="close">&times;</span>
        <br></br>
        <p>Add New Team Member</p>
        <form className="modal_edit_container">
          <div className="modal_details">
            <div className="shop_form_item">
              <label >Name: </label>
              <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div className="shop_form_item">
              <label >Email </label>
              <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className="shop_form_item">
              <label >Role </label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={1}>Admin</option>
                <option value={0}>Marketing</option>
              </select>
            </div>

          </div>
        </form>

        <div className="modal_edit_submit">
          <button onClick={onSubmit}>Add Member</button>
        </div>
      </div>
    </div >
  )
}

export default Add