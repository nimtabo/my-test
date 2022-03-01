import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification'
import FileUpload from "../../../file-upload/file-upload";
import axios from "axios";


function ProductForm({ filterTable, adFilter, setShowAddPart, showAddPart }) {
  const [data, setData] = useState({})
  const [makes, setMakes] = useState([])
  const [make, setMake] = useState("")
  const [shops, setShops] = useState([])
  const [shop, setShop] = useState('')
  const [models, setModels] = useState([])
  const [model, setModel] = useState("")
  const [years, setYears] = useState([])
  const [year, setYear] = useState("")
  const [engines, setEngines] = useState([])
  const [engine, setEngine] = useState("")
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [parts, setParts] = useState([])
  const [part, setPart] = useState("")
  const [partNumber, setPartNumber] = useState("")
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState("")
  const [grade, setGrade] = useState('')
  const [stock, setStock] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });
  const [submission, setSubmission] = useState({

  })
  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState('')

  const token = useSelector(state => state.token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makes = await axios.get('/api/cars/makes');
        setMakes([...makes.data])
        const shops = await axios.get('/api/shop/shops', {
          headers: { Authorization: token }
        });
        // console.log(shops.data)
        setShop(shops.data)
        // setShops([...shops.data])
        // console.log(shops.data);
      } catch (error) {
        setErr("An Error occured Loading makes")
        return setTimeout(() => {
          setMakes([...[]])
          setErr('')
        }, 3000);
        // console.log(error.message)
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const models = await axios.post(`/api/cars/${make}`);
        setModels([...models.data])
        years.splice(0, years.length)
        engines.splice(0, engines.length)
        categories.splice(0, categories.length)
        parts.splice(0, parts.length)
        setYears([...years])
        setEngines([...engines])
        setCategories([...categories])
        setParts([...parts])
        // Reste choices

        setModel('')
        setYear('')
        setEngine('')
        setCategory('')
        setPart('')
      } catch (error) {
        // console.log("An Error occured Getting models")
        return setModels([...[]])
      }
    }
    fetchData();
  }, [make]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const years = await axios.post(`/api/cars/${make}/${model}`);
        setYears([...years.data])
        engines.splice(0, engines.length)
        categories.splice(0, categories.length)
        parts.splice(0, parts.length)
        setEngines([...engines])
        setCategories([...categories])
        setParts([...parts])
        // Reset Choices
        setYear('')
        setEngine('')
        setCategory('')
        setPart('')
      } catch (error) {
        // console.log("An Error occured Getting Years")
        return setYears([...[]])
      }
    }
    fetchData();
  }, [model]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const engine = await axios.post(`/api/cars/${make}/${model}/${year}`);
  //       setEngines([...engine.data])
  //       categories.splice(0, categories.length)
  //       parts.splice(0, parts.length)
  //       setCategories([...categories])
  //       setParts([...parts])
  //       // Reset Choices
  //       setEngine('')
  //       setCategory('')
  //       setPart('')
  //     } catch (error) {
  //       // console.log("An Error occured Getting Categories")
  //       return setCategories([...[]])
  //     }
  //   }
  //   fetchData();
  // }, [year]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const category = await axios.post(`/api/cars/${make}/${model}/${year}/${engine}`);
  //       setCategories([...category.data])
  //       parts.splice(0, parts.length)
  //       setParts([...parts])
  //       // Reset Choices
  //       setCategory('')
  //       setPart('')
  //     } catch (error) {
  //       // console.log("An Error occured Getting Egines")
  //       return setEngines([...[]])
  //     }
  //   }
  //   fetchData();
  // }, [engine]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`api/cars/parts/${make}/${model}/${year}`);
        setParts([...res.data])

        // Reset part
        setPart('')
      } catch (error) {
        // console.log("An Error occured Getting Parts")
        return setParts([...[]])
      }
    }
    fetchData();
  }, [year]);

  // useEffect(() => {
  //   const data = { make, model, year, part }
  //   setData({ ...data })
  // }, [part]);


  // useEffect(() => {
  //   setData({ ...data, zipcode })
  //   console.log(zipcode)
  // }, [zipcode]);

  // useEffect(() => {
  //   console.log(data)
  // }, [data]);

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
  }


  const updateUploadedFiles = (files) =>
    setNewUserInfo({ profileImages: [...files] });

  const updateImageFile = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (isNaN(price)) {
      setSuccess('')
      setErr("Part Price Values be Number")
      return setTimeout(() => {
        setErr('')
      }, 3000);
    }

    if (!imageFile) {
      setErr('No files were uploaded.')
      return setTimeout(() => {
        setErr('')
      }, 5000);
    }

    if (imageFile.size > 1024 * 1024) {
      setErr("Size too large.")
      return setTimeout(() => {
        setErr('')
      }, 5000);
    }
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png') {
      setErr("File format is incorrect.")
      return setTimeout(() => {
        setErr('')
      }, 5000);
    }

    if ((make === "" || make === "Select make") || (model === "" || model === "Select a make" || model === "Select model") || (year === "" || year === "Select a model" || year === "Select year") || (part === "" || part === "Select category" || part === "Select part") || (price === "")) {
      // const data = { make, model, year, part, partNumber, description, price }
      // console.log("Err", data)
      setSuccess('')
      setErr("All marked fields are required (make, model, year part and price).");
      return setTimeout(() => {
        setErr('')
      }, 3000);
    } else {
      try {
        const data = { make, model, year, part, partNumber, description, price: Number(price), shop }
        const formData = new FormData();
        formData.append('file', imageFile)
        // newUserInfo.profileImages.forEach(file => {
        //   formData.append("multiple_image", file);
        // });

        for (let key in data) {
          formData.append(`${key}`, data[key])
        }
        // http://localhost:5000/api/shop/shops/6093a22d5843f1295cae7178/products
        const product = await axios.post(`/api/shop/shops/${shop}/products`, formData, {
          headers: { Authorization: token, 'content-type': 'multipart/form-data' }
        });
        // console.log("Success", product)
        setMake('')
        setModel('')
        setYear('')
        setPart('')
        setPartNumber('')
        setDescription('')
        setPrice('')
        setImageFile('')
        filterTable(adFilter)
        setErr('')
        handleReset()
        setSuccess("Part added successfully")
        return setTimeout(() => {
          setSuccess('')
        }, 3000);
      } catch (error) {
        setSuccess('')
        setErr(error.message)
        return setTimeout(() => {
          setErr('')
        }, 3000);
      }


    }

  }


  return (
    <div className="modal">
      {/* product_forms_rwaper */}
      <div className="modal-content">
        <span onClick={() => { setShowAddPart(!showAddPart) }} className="close">&times;</span>
        <p>Add new parts to sell</p>

        <form className="modal_edit_container" onSubmit={onSubmit}>
          <div className="modal_fields">
            <div className="modal_field">
              <label htmlFor="make">make: </label>
              <select
                name="make"
                id="make"
                className="hero-make"
                value={make}
                onChange={(e) => { setMake(e.target.value) }}>
                <option>Select make</option>
                {
                  makes.map(make => {
                    return <option key={make}>{make}</option>
                  })
                }
              </select>
            </div>

            <div className="modal_field">
              <label htmlFor="model">model: </label>
              <select name="model"
                value={model}
                onChange={(e) => { setModel(e.target.value) }}>
                {models.length === 0 ? <option>Select a make</option> : <option>Select model</option>}
                {
                  models.map(model => {
                    return <option key={model}>{model}</option>
                  })
                }
              </select>
            </div>

            <div className="modal_field">
              <label htmlFor="year">year: </label>
              <select name="year"
                value={year}
                onChange={(e) => { setYear(e.target.value) }}>
                {years.length === 0 ? <option>Select a model</option> : <option>Select year</option>}
                {
                  years.map(year => {
                    return <option key={year}>{year}</option>
                  })
                }
              </select>
            </div>

            <div className="modal_field">
              <label htmlFor="part">part: </label>
              <select name="engine"
                value={part}
                onChange={(e) => { setPart(e.target.value) }}
              >
                {parts.length === 0 ? <option>Select year</option> : <option>Select part</option>}
                {
                  parts.map(part => {
                    return <option key={part}>{part}</option>
                  })
                }
              </select>
            </div>

          </div>

          <div className="modal_details">
            <div className="shop_form_item">
              <label htmlFor="partNumber">Part Number: </label>
              <input type="text" name="partNumber" value={partNumber} onChange={(e) => { setPartNumber(e.target.value) }} maxLength="32" />
            </div>

            <div className="shop_form_item">
              <label htmlFor="description">Description: </label>
              <textarea
                rows="4" cols="10"
                name="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                maxLength="150"
              ></textarea>
              {/* <input type="text" name="description" value={description} onChange={(e) => { setDescription(e.target.value) }} /> */}
            </div>

            <div className="shop_form_item">
              <label htmlFor="price">price: </label>
              {/* <input type="text" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} /> */}
              <input type="number" name="price" min="0.00" max="10000.00" step="0.01" maxLength="10"
                onChange={(e) => { setPrice(e.target.value) }} />
            </div>

            {/* <div className="shop_form_item">
              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Upload Images"
                multiple
                updateFilesCb={updateUploadedFiles}
              />
            </div> */}

            {/* <div className="shop_form_item btn">
              <button type="submit">Add part</button>
            </div> */}
          </div>
        </form>

        {/* <div className="shop_form_item">
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Upload Images"
            // multiple
            updateFilesCb={updateUploadedFiles}
          />
        </div> */}

        <div className="shop_form_item">
          {/* <img src={avatar ? avatar : user.avatar} alt="" /> */}
          <span>
            <i className="fas fa-camera"></i>
            <p>Change</p>
            <input type="file" name="file" id="file_up" onChange={updateImageFile} />
          </span>
        </div>

        <div className="modal_edit_submit">
          <button onClick={onSubmit}>Add part</button>
        </div>
      </div>
      {/* <div>
        {err ? showErrMsg(err) : <h2>Add new parts to sell</h2>}
      </div> */}


      {/* <div className="form_header_container">
        <div className="h1"><h2>Add new parts to sell</h2></div>

        <div>
          <button type="button"
            onClick={() => { setShowAddPart(!showAddPart) }}
          >X Close</button>
        </div>
      </div> */}

      {/* <div>
        {success && showSuccessMsg(success) || err && showErrMsg(err)}
      </div> */}
      {/* <form className="shop_form_items" onSubmit={onSubmit}> */}
      {/* <div className="shop_form_item_container">
          <div className="shop_form_item">
            <label htmlFor="make">make: </label>
            <select
              name="make"
              id="make"
              className="hero-make"
              value={make}
              onChange={(e) => { setMake(e.target.value) }}>
              <option>Select make</option>
              {
                makes.map(make => {
                  return <option key={make}>{make}</option>
                })
              }
            </select>
          </div>

          <div className="shop_form_item">
            <label htmlFor="model">model: </label>
            <select name="model"
              value={model}
              onChange={(e) => { setModel(e.target.value) }}>
              {models.length === 0 ? <option>Select a make</option> : <option>Select model</option>}
              {
                models.map(model => {
                  return <option key={model}>{model}</option>
                })
              }
            </select>
          </div>

          <div className="shop_form_item">
            <label htmlFor="year">year: </label>
            <select name="year"
              value={year}
              onChange={(e) => { setYear(e.target.value) }}>
              {years.length === 0 ? <option>Select a model</option> : <option>Select year</option>}
              {
                years.map(year => {
                  return <option key={year}>{year}</option>
                })
              }
            </select>
          </div>

          <div className="shop_form_item">
            <label htmlFor="part">part: </label>
            <select name="engine"
              value={part}
              onChange={(e) => { setPart(e.target.value) }}
            >
              {parts.length === 0 ? <option>Select year</option> : <option>Select part</option>}
              {
                parts.map(part => {
                  return <option key={part}>{part}</option>
                })
              }
            </select>
          </div>
        </div> */}

      {/* <div className="shop_form_item_container">
          <div className="shop_form_item">
            <label htmlFor="partNumber">Part Number: </label>
            <input type="text" name="partNumber" value={partNumber} onChange={(e) => { setPartNumber(e.target.value) }} />
          </div>

          <div className="shop_form_item">
            <label htmlFor="description">Description: </label>
            <textarea
              rows="4" cols="10"
              name="description"
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
            ></textarea>
          </div>

          <div className="shop_form_item">
            <label htmlFor="price">price: </label>
            <input type="number" name="price" min="0.00" max="10000.00" step="0.01"
              onChange={(e) => { setPrice(e.target.value) }} />
          </div>

          <div className="shop_form_item">
            <FileUpload
              accept=".jpg,.png,.jpeg"
              label="Upload Images"
              multiple
              updateFilesCb={updateUploadedFiles}
            />
          </div>


          <div className="shop_form_item btn">
            <button type="submit">Add part</button>
          </div>
        </div> */}
      {/* </form> */}
    </div>
  )
}

export default ProductForm
