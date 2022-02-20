import React, { useState, useEffect } from 'react'
import axios from "axios";
import FileUpload from '../../../file-upload/file-upload';



function EditModal({ product, token, shop, filterTable, deleteProduct, adFilter, setSuccess, setErr, setShowEditPart, showEditPart, setUpdateTable, updateTable }) {
  const [partNumber, setPartNumber] = useState("")
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState("")
  const [isAvailable, setIsAvailable] = useState('')
  const [imgs, setImgs] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const [value, setValue] = useState();
  const [data, setData] = useState({
    partNumber: '',
    description: '',
    price: '',
    availability: '',
  })

  useEffect(() => {
    const populateData = async () => {
      try {
        setPartNumber(product.partNumber)
        setDescription(product.description)
        setPrice(product.price)
        setIsAvailable(product.availability)
      } catch (error) {
        console.log(error.message)
      }

    }
    populateData()
  })

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const deleteImg = async (url) => {

    // console.log({ id: product._id, url })
    try {
      const res = await axios.patch(`/api/shop/shops/${shop}/products/${product._id}/delete_image`, { url }, {
        headers: { Authorization: token }
      });
      // if (res.data.success === "ok") {
      // }
      setSuccess("Image Deleted")
      setUpdateTable(!updateTable)
      // let updatedImages = imgs.filter(item => url !== item)
      // imgs.splice(0, imgs.length)
      // setImgs([...updatedImages])
      const newProduct = await axios.get(`/api/shop/shops/${shop}/products/${product._id}`, {
        headers: { Authorization: token }
      });
      setImgs([newProduct.data.multiple_image])
      // console.log(imgs)
      return setTimeout(() => {
        setSuccess('')
      }, 5000);
    } catch (error) {
      console.log(error.message)
      setErr("Image not deleted")
      return setTimeout(() => {
        setErr('')
      }, 5000);
    }
  }

  const changeImage = async (url) => {
    try {
      const res = await axios.patch(`/api/shop/shops/${shop}/products/${product._id}/delete_image`, { url }, {
        headers: { Authorization: token, 'content-type': 'multipart/form-data' }
      });

      setSuccess("Image updated")
      setUpdateTable(!updateTable)
      return setTimeout(() => {
        setSuccess('')
      }, 5000);
    } catch (error) {
      console.log(error.message)
      setErr("Image not changed")
      return setTimeout(() => {
        setErr('')
      }, 5000);
    }
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    document.querySelector("textarea").value = ""
    document.querySelectorAll("select").value = ""
  }

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ profileImages: [...files] });

  const handleClick = async () => {
    let newProduct = { ...data }
    // newProduct.url = product.multiple_image

    if (data.partNumber === '') {
      newProduct.partNumber = partNumber
      // console.log({ partNumber })
    }
    if (data.description === '') {
      newProduct.description = description
    }
    if (data.price === '') {
      newProduct.price = price
    }
    if (data.availability === '') {
      newProduct.availability = isAvailable
    }
    // if (parseInt(newProduct.availability) === 4) {
    //   return deleteProduct(product._id, adFilter)
    // }
    try {
      const formData = new FormData();
      newUserInfo.profileImages.forEach(file => {
        formData.append("multiple_image", file);
      });
      for (let key in newProduct) {
        formData.append(`${key}`, newProduct[key])
      }

      const savedProduct = await axios.patch(`/api/shop/shops/${shop}/products/${product._id}`, formData, {
        headers: { Authorization: token }
      });
      setSuccess(`Part Updated Successfully`)
      filterTable(adFilter)
      // handleReset()
      // console.log(savedProduct.data)
      setTimeout(() => {
        setSuccess('')
      }, 5000);
      return setShowEditPart(!showEditPart)
    } catch (error) {
      // console.log(error.message)
      setErr(`Part Update Failed`)
      return setTimeout(() => {
        setErr('')
      }, 3000);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => { setShowEditPart(!showEditPart) }} className="close">&times;</span>
        <p>EDIT AD</p>
        <div className="modal_edit_container">
          <div className="modal_fields">
            <div className="modal_field">
              <div>Part Number:</div>
              <label>

                <input
                  type="text" name="partNumber"
                  defaultValue={partNumber}
                  onChange={handleChange}
                  maxLength="32"
                // onChange={(e) => { setPartNumber(e.target.value) }}
                />
              </label>
            </div>

            <div className="modal_field">
              <div>Description:</div>
              <label>
                <textarea
                  // rows="4" cols="32"
                  name="description"
                  defaultValue={description}
                  onChange={handleChange}
                  maxLength="150"
                >
                </textarea>
              </label>
            </div>

            <div className="modal_field">
              <div>price:</div>
              <label>

                <input
                  type="number" name="price"
                  // value={price}
                  defaultValue={price}
                  onChange={handleChange}
                  maxLength="10"
                // onChange={(e) => { setPrice(e.target.value) }}
                />
              </label>
            </div>

            <div className="modal_field">
              <div>Availability: </div>
              <label>

                <select name="availability"
                  // value={isAvailable}
                  defaultValue={isAvailable}
                  onChange={handleChange}
                // onChange={(e) => { setIsAvailable(e.target.value) }}
                >
                  <option value="">Select Option</option>
                  {!(adFilter === "available") && <option value="0">Available</option>}
                  {!(adFilter === "soldout") && <option value="1">Sold Out</option>}
                  {!(adFilter === "onhold") && <option value="2">Put On-Hold</option>}
                  {!(adFilter === "archived") && <option value="3">Archive</option>}
                  <option value="4">Delete</option>
                </select>
              </label>
            </div>



          </div>
          {/* IMAGES */}
          <div className="modal_images">
            {imgs.length > 0 ? imgs.map((i, idx) => {
              return <div key={idx} className="edit_img_container">
                <img className='edit_img' src={i} alt='' />
                {/* <img onMouseOver={() => { setShowDelete(!showDelete) }} className='edit_img' src={i} alt='' /> */}
                {/* <button style={showDelete ? { display: "block" } : { display: "none", }} onClick={() => deleteImg(i)} className="edit_img_centered">Delete</button> */}
              </div>
            }) :
              product.multiple_image && product.multiple_image.map((i, idx) => {
                return <div key={idx} className="edit_img_container" >
                  <img className='edit_img' src={i} alt='' />
                  <button className="edit_img_side" onClick={() => deleteImg(i)}>Delete Image</button>
                  {/* <button style={showDelete ? { display: "block" } : { display: "none", }} onClick={() => deleteImg(i)} className="edit_img_centered">Delete</button> */}
                </div>

              })}

            <div className='edit_upload_section'>
              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Upload Images"
                // multiple
                updateFilesCb={updateUploadedFiles}
              />
              <div className='edit_upload_sec_image'>
                <button>Delete Image</button>
              </div>
            </div>

            {/* <div className="dddd">
              <button onClick={() => {
                changeImage()
              }}>Update Image</button>
            </div> */}
          </div>
        </div>

        <div className="modal_edit_submit">
          <button onClick={() => {
            handleClick()
          }}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
