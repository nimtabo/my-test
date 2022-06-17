import React from 'react'

const Edit = ({ setShowEdit, showEdit }) => {

  const onSubmit = () => {
    console.log("submit")
  }
  return (
    <div className="modal">
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
              <input type="text" name="name" />
            </div>
            <div className="shop_form_item">
              <label >Email </label>
              <input type="text" name="email" />
            </div>
            <div className="shop_form_item">
              <label >Role </label>
              <select>
                <option>Admin</option>
                <option>Finance</option>
                <option>Marketing</option>
              </select>
            </div>

          </div>
        </form>

        <div className="modal_edit_submit">
          <button>Edit Member</button>
        </div>
      </div>
    </div >
  )
}

export default Edit