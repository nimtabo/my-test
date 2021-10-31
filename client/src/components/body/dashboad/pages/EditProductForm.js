import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification'
import axios from "axios";

function EditProductForm({ setUpdateTable, updateTable, product, filterTable, adFilter, setShowEditPart, showEditPart }) {
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
  const [isAvailable, setIsAvailable] = useState('')

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
        // ***********************
        // ***********************
        setPartNumber(product.partNumber)
        // ***********************
        // ***********************
      } catch (error) {
        console.log("An Error occured getting makes")
        // console.log(error.message)
        return setMakes([...[]])
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


  const onSubmit = async (e) => {
    e.preventDefault()
    // document.getElementById("e_form").reset();
    const productId = product._id;
    const selectedProduct = product;
    // console.log({ selectedProduct })
    // console.log((partNumber === '' ? selectedProduct.partNumber : partNumber))
    // console.log(partNumber)

    if (isNaN(partNumber) || isNaN(price)) {
      setSuccess('')
      setErr("Part Number and Price Values must be Numbers")
      return setTimeout(() => {
        setErr('')
      }, 2000);
    }

    if ((make === "" || make === "Select make") || (model === "" || model === "Select a make" || model === "Select model") || (year === "" || year === "Select a model" || year === "Select year") || (part === "" || part === "Select category" || part === "Select part")) {

      try {
        const data = {
          make: selectedProduct.make, model: selectedProduct.model, year: selectedProduct.year, part: selectedProduct.part,
          partNumber: partNumber === '' ? selectedProduct.partNumber : Number(partNumber),
          description: description === '' ? selectedProduct.description : description,
          price: price === '' ? selectedProduct.price : Number(price),
        }
        // console.log("Car_not changed", data)

        if (isAvailable !== '' || isAvailable === '0' || isAvailable === '1') {
          data.isAvailable = isAvailable;
        } else if (isAvailable === '2') {
          data.isOnHold = selectedProduct.isOnHold;
        } else {
          data.isAvailable = selectedProduct.isAvailable;
          data.isOnHold = selectedProduct.isOnHold;
        }

        // http://localhost:5000/api/shop/shops/:shopId/products/:productId
        const product = await axios.patch(`/api/shop/shops/${shop}/products/${productId}`, data, {
          headers: { Authorization: token }
        });

        setMake('')
        setModel('')
        setYear('')
        setPart('')
        setPartNumber('')
        setDescription('')
        setPrice('')
        setIsAvailable('')
        // setUpdateTable(!updateTable)
        filterTable(adFilter)
        setErr('')
        setSuccess("Add Updated successfully")

        setTimeout(() => {
          setSuccess('')
        }, 1500);
        return setTimeout(() => {
          setShowEditPart(!showEditPart)
        }, 2000);
      } catch (error) {
        // console.log(error.message)
        setSuccess('')
        setErr(error.msg)
        return setTimeout(() => {
          setErr('')
        }, 2000);
      }
    } else {
      try {
        const data = { make, model, year, part, partNumber: Number(partNumber), description, price: Number(price), shop }
        // if (isAvailable !== '' || isAvailable === '0' || isAvailable === '1') {
        //   data.isAvailable = isAvailable;
        // } else {
        //   data.isAvailable = selectedProduct.isAvailable;
        // }

        if (isAvailable !== '' || isAvailable === '0' || isAvailable === '1') {
          data.isAvailable = isAvailable;
        } else if (isAvailable === '2') {
          data.isOnHold = selectedProduct.isOnHold;
        } else {
          data.isAvailable = selectedProduct.isAvailable;
          data.isOnHold = selectedProduct.isOnHold;
        }
        // console.log(data)

        // http://localhost:5000/api/shop/shops/:shopId/products/:productId
        const product = await axios.patch(`/api/shop/shops/${shop}/products/${productId}`, data, {
          headers: { Authorization: token }
        });
        // console.log("Success", product)


        setMake('')
        setModel('')
        setYear('')
        setPart('')
        setPartNumber('')
        setDescription('')
        setPrice('')
        setIsAvailable('')
        // setUpdateTable(!updateTable)
        filterTable(adFilter)
        setErr('')
        setSuccess("Add Updated successfully")
        setTimeout(() => {
          setSuccess('')
        }, 1500);
        return setTimeout(() => {
          setShowEditPart(!showEditPart)
        }, 2000);
      } catch (error) {
        setSuccess('')
        setErr(error.msg)
        return setTimeout(() => {
          setErr('')
        }, 2000);
      }


    }

  }


  return (
    <div className="product_forms_rwaper">
      {/* <div>
        {err ? showErrMsg(err) : <h2>Add new parts to sell</h2>}
      </div> */}

      <div className="form_header_container">
        <div><h2>Update Part</h2></div>

        <div>
          <button type="button"
            onClick={() => { setShowEditPart(!showEditPart) }}
          >X Close</button>
        </div>
      </div>
      <div>
        {success && showSuccessMsg(success) || err && showErrMsg(err)}
      </div>
      <form id="e_form" className="shop_form_items" onSubmit={onSubmit}>
        <div className="shop_form_item_container">
          <div className="shop_form_item">
            <label htmlFor="make">make: {product.make}</label>
            <select
              name="make"
              id="make"
              className="hero-make"
              value={make}
              // selected={product.make}
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
            <label htmlFor="model">model: {product.model}</label>
            <select name="model"
              value={model}
              // defaultValue={product.model}
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
            <label htmlFor="year">year: {product.year}</label>
            <select name="year"
              value={year}
              // defaultValue={product.year}
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
            <label htmlFor="part">part: {product.part} </label>
            <select name="engine"
              value={part}
              // defaultValue={product.part}
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

        <div className="shop_form_item_container">
          <div className="shop_form_item">
            <label htmlFor="partNumber">Part Number: </label>
            <input type="text" name="partNumber"
              // value={partNumber} 
              defaultValue={product.partNumber}
              onChange={(e) => { setPartNumber(e.target.value) }} />
          </div>

          <div className="shop_form_item">
            <label htmlFor="description">Description: </label>
            <input type="text" name="description"
              // value={description}
              defaultValue={product.description}
              onChange={(e) => { setDescription(e.target.value) }} />
          </div>

          <div className="shop_form_item">
            <label htmlFor="price">price: </label>
            <input type="text" name="price"
              // value={price}
              defaultValue={product.price}
              onChange={(e) => { setPrice(e.target.value) }} />
          </div>

          <div className="shop_form_item">
            <label htmlFor="part">Availability </label>
            <select name="availability"
              value={isAvailable}
              // defaultValue={product.part}
              onChange={(e) => { setIsAvailable(e.target.value) }}
            >
              <option value="">Select Option</option>
              <option value="1">Available</option>
              <option value="0">Sold Out</option>
              <option value="2">Put On-Hold</option>
            </select>
          </div>

          <div className="shop_form_item btn">
            <button type="submit">Update</button>
          </div>

        </div>




        {/* <div className="shop_form_item">
        <label htmlFor="engine">engine: </label>
        <select name="engine"
          value={engine}
          onChange={(e) => { setEngine(e.target.value) }}
        >
          {engines.length === 0 ? <option>Select a year</option> : <option>Select engine</option>}
          {
            engines.map(engine => {
              return <option key={engine}>{engine}</option>
            })
          }
        </select>
      </div> */}

        {/* <div className="shop_form_item">
        <label htmlFor="category">category: </label>
        <select name="category"
          value={category}
          onChange={(e) => { setCategory(e.target.value) }}
        >
          {categories.length === 0 ? <option>select engine</option> : <option>Select category</option>}
          {
            categories.map(category => {
              return <option key={category}>{category}</option>
            })
          }
        </select>
      </div> */}



        {/* <div className="shop_form_item">
        <label htmlFor="grade">grade: </label>
        <select name="grade" value={grade} onChange={(e) => { setGrade(e.target.value) }}>
          <option value="A">Select grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div> */}



        {/* <div className="shop_form_item">
        <label htmlFor="stock">stock: </label>
        <input type="number" name="stock" value={stock} onChange={(e) => { setStock(e.target.value) }} />
      </div> */}



      </form>
    </div>
  )
}

export default EditProductForm

