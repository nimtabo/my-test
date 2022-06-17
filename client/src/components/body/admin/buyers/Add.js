import React from 'react'

const Add = ({ setShowAddPart, showAddPart }) => {

  const onSubmit = () => {
    console.log("submit")
  }
  return (
    <div className="modal">
      {/* product_forms_rwaper */}
      <div className="modal-content">
        <span onClick={() => { setShowAddPart(!showAddPart) }} className="close">&times;</span>
        <p>Add New Buyer</p>
        <form className="modal_edit_container" onSubmit={onSubmit}>
          <div className="modal_fields">
          </div>

          <div className="modal_details">
            <div className="shop_form_item">
              <label >Email </label>
              <input type="text" name="email" />
            </div>

          </div>
        </form>

        <div className="modal_edit_submit">
          <button>Invite buyer</button>
        </div>
      </div>
    </div >
  )
}

export default Add