import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { showErrMsg } from '../../utils/notification/Notification'
import './listing.css'


const initialState = { make: '', model: '', year: '', engine: '', category: '', part: '' }
const Listing = () => {
  const [makes, setMakes] = useState([])
  const [make, setMake] = useState("")
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
  const [grade, setGrade] = useState('')
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")
  // const [zipcode, setZipcode] = useState("")
  const [err, setErr] = useState("")

  const [data, setData] = useState(initialState)
  // const [home, setHome] = useState({ make: '', model: '', year: '', part: '' })
  const [products, setProducts] = useState([])


  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(location.state)
        // setHome({ ...location.state })
        const makes = await axios.get('/api/cars/makes');
        setMakes([...makes.data])
        if (location.state.make && location.state.model && location.state.year && location.state.part) {
          const prodRes = await axios.get(`/api/product/search/${location.state.make}/${location.state.model}/${location.state.year}/${location.state.part}`);
          // console.log("RES", prodRes.data);
          setProducts([...prodRes.data])
        }
      } catch (error) {
        console.log("An Error occured getting makes")
        // console.log(error.message)
        // return setMakes([...[]])
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makes = await axios.get('/api/cars/makes');
        setMakes([...makes.data])
      } catch (error) {
        console.log("An Error occured getting makes")
        // console.log(error.message)
        return setMakes([...[]])
      }
    }
    fetchData();
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       products.splice(0, years.length)
  //       const prodRes = await axios.get(`/api/product/search/${data.make}/${data.model}/${data.year}/${data.engine}/${data.category}/${data.part}`);
  //       console.log("Listing", prodRes.data);
  //       setProducts([...prodRes.data])
  //     } catch (error) {
  //       console.log("An Error occured getting Data")
  //       // console.log(error.message)
  //       return setProducts([...[]])
  //     }
  //   }
  //   fetchData();
  // }, [data])

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
  //   const data = { make, model, year, engine, category, part }
  //   setData({ ...data })
  // }, [part]);

  // useEffect(() => {
  //   console.log(data)
  // }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault()

    if ((make === "" || make === "Select make") || (model === "" || model === "Select a make" || model === "Select model") || (year === "" || year === "Select a model" || year === "Select year") || (part === "" || part === "Select category" || part === "Select part")) {
      const data = { make, model, year, part }
      console.log("Err", data)
      return setErr("All marked fields are required");
    } else {
      // setData({ ...data })
      // console.log("Success", products)
      // return setErr("Go to LISTING PAGE")
      try {
        // const data = { make, model, year, engine, category, part }
        products.splice(0, years.length)
        const prodRes = await axios.get(`/api/product/search/${make}/${model}/${year}/${part}`);
        // console.log("Listing", prodRes.data);
        setProducts([...prodRes.data])
      } catch (error) {
        console.log("An Error occured getting Data")
        // console.log(error.message)
        return setProducts([...[]])
      }
    }

  }

  return (
    <div className="listing_page">
      <div className="listing_left_filter">
        <form onSubmit={onSubmit}>
          <div>
            {err && showErrMsg(err)}
          </div>

          <div className="listing_left_filter_form_item">
            {/* <label htmlFor="make">Make</label> */}
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

          <div className="listing_left_filter_form_item">
            {/* <label htmlFor="model">Model: </label> */}
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

          <div className="listing_left_filter_form_item">
            {/* <label htmlFor="year">Year: </label> */}
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

          {/* <div className="listing_left_filter_form_item">
            <label htmlFor="engine">Engine: </label>
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

          {/* <div className="listing_left_filter_form_item">
            <label htmlFor="category">Category: </label>
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

          <div className="listing_left_filter_form_item">
            {/* <label htmlFor="part">Part: </label> */}
            <select name="engine"
              value={part}
              onChange={(e) => { setPart(e.target.value) }}
            >
              {parts.length === 0 ? <option>Select category</option> : <option>Select part</option>}
              {
                parts.map(part => {
                  return <option key={part}>{part}</option>
                })
              }
            </select>
          </div>

          <div className="listing_left_filter_form_item">
            <button type="submit">Search</button>
          </div>

        </form>
      </div>

      <div className="listing_right_items">

        {
          products.length < 1 ? (
            <div>
              <h2>No parts Found</h2>
            </div>
          ) : (
            products.map(prod => {
              return (
                <div className="listing_item" key={prod._id}>
                  <div className="listing_item_image" alt=''><img src={prod.multiple_image[0]} /></div>
                  <div className='left_div'>
                    <p key={prod.make}><span className="text_item">make:</span> <span>{prod.make}</span></p>
                    <p key={prod.model}> <span className="text_item">model:</span> <span>{prod.model}</span> </p>
                    <p key={prod.year}><span className="text_item">year:</span> <span>{prod.year}</span> </p>
                    <p key={prod.part}><span className="text_item">part: </span> <span>{prod.part}</span> </p>
                    <p className="cut_text" key={prod.description}><span className="text_item">Description:</span> <span>{prod.description}</span> </p>
                    {/* <p key={prod.engine}><span className="text_item">Engine:</span> <span>{prod.engine}</span></p> */}
                    <p key={prod.price}><span className="text_item">price:</span> <span> {prod.price}</span></p>
                    {/* <p key={prod.grade}><span className="text_item">grade:</span> <span>{prod.grade}</span> </p> */}
                    {/* <p key={prod.stock}><span className="text_item">Available:</span> {prod.stock}</p> */}
                  </div>
                  <div>
                    <p key={prod.shop.name}><span className="text_item">Seller name:</span> <span>{prod.shop.name}</span></p>
                    <p key={prod.shop.phone}><span className="text_item">Phone:</span> <span>{prod.shop.phone}</span></p>
                    <p key={prod.shop.email}><span className="text_item">email:</span> <span>{prod.shop.email}</span></p>
                    <p key={prod.shop.city}>
                      <span className="text_item text_item_inner">City:</span> <span>{prod.shop.city}</span>
                      {/* <span className="span_double">   </span> */}
                      {/* <span className="text_item text_item_inner">State:</span> <span>{prod.shop.stateProvince}</span> */}
                    </p>
                    <p key={prod.shop.city}>
                      <span className="text_item text_item_inner">State:</span> <span>{prod.shop.stateProvince}</span>
                    </p>
                    {/* <p key={prod.shop.stateProvince}><span className="text_item">State:</span> <span>{prod.shop.stateProvince}</span></p> */}
                    <p key={prod.shop.website}><span className="text_item">Website:</span> <span><a href={`http://${prod.shop.website}`} target="_blank">{prod.shop.website}</a></span></p>

                    {/* <p>Payment options: </p>
                  <ul>
                    {
                      prod.shop.paymentMethod.map(op => {
                        return (<li key={op.label}>{op.label}</li>)
                      })
                    }
                  </ul> */}
                    {/* <p>Shipment options:</p>
                  <ul>
                    {
                      prod.shop.shipmentMethod.map(op => {
                        return (<li key={op.label}>{op.label}</li>)
                      })
                    }
                  </ul> */}
                  </div>
                </div>
              )
            }))
        }

      </div>
    </div>
  )
}

export default Listing
