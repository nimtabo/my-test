import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from "axios";
import { formatValue } from 'react-currency-input-field';
import { FiLogIn } from 'react-icons/fi';
import { showErrMsg } from '../../utils/notification/Notification'
import locked from "../../../img/locked.png"
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
  const auth = useSelector(state => state.auth)

  const { user, isLogged } = auth

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(location.state)
        // setHome({ ...location.state })
        const makes = await axios.get('/api/cars/makes');
        setMakes([...makes.data])
        if (location.state.make && location.state.model && location.state.year && location.state.part) {
          const prodRes = await axios.get(`/api/product/search/${location.state.make}/${location.state.model}/${location.state.year}/${location.state.part}`);
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
      // console.log("Err", data)
      setErr("All marked fields are required");
      return setTimeout(() => {
        setErr("");
      }, 5000);
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
        // console.log("An Error occured getting Data")
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
              // value={make}
              defaultValue={location.state.make}
              onChange={(e) => { setMake(e.target.value) }}>
              <option>make</option>
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
              // value={model}
              defaultValue={location.state.model}
              onChange={(e) => { setModel(e.target.value) }}>
              <option>model</option>
              {/* {models.length === 0 ? <option>make</option> : <option>model</option>} */}
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
              // value={year}
              defaultValue={location.state.year}
              onChange={(e) => { setYear(e.target.value) }}>
              <option>year</option>
              {/* {years.length === 0 ? <option>model</option> : <option>year</option>} */}
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
              // value={part}
              defaultValue={location.state.part}
              onChange={(e) => { setPart(e.target.value) }}
            >
              <option>part</option>
              {/* {parts.length === 0 ? <option>Model</option> : <option>part</option>} */}
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

      <div className='list_table'>
        <div className='headers'>
          <div>IMAGE</div>
          <div>SELLER</div>
          <div>CITY</div>
          {/* <div>STATE</div> */}
          <div>PHONE</div>
          <div>EMAIL</div>
          <div>DESCRIPTION</div>
          <div>PRICE</div>
          <div>LIVE CHAT</div>
        </div>

        <div className='list_items'>

          {
            products.length < 1 ? (
              <div className='listing_item'>
                <h2>No parts Found</h2>
              </div>
            ) : (products.map(prod => {
              return isLogged ? (
                <div key={prod._id} className='list_item'>
                  <div><img src={prod.multiple_image[0]} /></div>
                  <div>{prod.shop.name.substring(0, 13)}...</div>
                  <div>{`${prod.shop.city} - ${prod.shop.stateProvince}`.substring(0, 26)}</div>
                  {/* <div>{prod.shop.stateProvince}</div> */}
                  <div>{prod.shop.phone}</div>
                  <div>{prod.shop.owner.email.substring(0, 13)}</div>
                  <div>{prod.description.substring(0, 25)}...</div>
                  <div>{formatValue({
                    value: `${prod.price}`,
                    groupSeparator: ',',
                    decimalSeparator: '.',
                    prefix: '$',
                  })}</div>
                  <div><i className="fas fa-comment-dots"></i></div>
                </div>
              ) : (
                <div key={prod._id} className='list_item_a'>
                  <div><img src={prod.multiple_image[0]} /></div>
                  <div>
                    <p className='login_hiden'>
                      <img src={locked} alt='' />
                      <p>To Contact Seller Please Sign in</p>
                      <button><FiLogIn /><Link to="/login">Sign in</Link></button>
                    </p>
                  </div>
                  <div>{prod.description.substring(0, 25)}...</div>
                  <div>{formatValue({
                    value: `${prod.price}`,
                    groupSeparator: ',',
                    decimalSeparator: '.',
                    prefix: '$',
                  })}</div>
                  <div><i className="fas fa-comment-dots"></i></div>
                </div>
              )
            })
            )}

          <button className='load_more'>Load More...</button>
        </div>


      </div>

      {/* <div className="listing_right_items">

        {
          products.length < 1 ? (
            <div className='listing_item'>
              <h2>No parts Found</h2>
            </div>
          ) : (
            products.map(prod => {
              return (
                <div className="listing_item" key={prod._id}>
                  <div className="listing_item_image" alt=''><img src={prod.multiple_image[0]} /></div>
                  <div className='left_div'>
                    <p ><span className="text_item">make:</span> <span>{prod.make}</span></p>
                    <p > <span className="text_item">model:</span> <span>{prod.model}</span> </p>
                    <p ><span className="text_item">year:</span> <span>{prod.year}</span> </p>
                    <p ><span className="text_item">part: </span> <span>{prod.part}</span> </p>
                    <p className="cut_text" ><span className="text_item">Description:</span> <span className='description'>{prod.description}</span> </p>
                    <p ><span className="text_item">price:</span> <span>{formatValue({
                      value: `${prod.price}`,
                      groupSeparator: ',',
                      decimalSeparator: '.',
                      prefix: '$',
                    })}</span></p>
                  </div>
                  <div>
                    <p ><span className="text_item">Seller name:</span> <span>{isLogged && prod.shop.name}</span></p>
                    <p ><span className="text_item">Phone:</span> <span>{isLogged && prod.shop.phone}</span></p>
                    <p ><span className="text_item">email:</span> <span>{isLogged && prod.shop.owner.email}</span></p>
                    <p >
                      <span className="text_item text_item_inner">City:</span> <span>{isLogged && prod.shop.city}</span>
                    </p>
                    <p >
                      <span className="text_item text_item_inner">State:</span> <span>{isLogged && prod.shop.stateProvince}</span>
                    </p>
                    <p><span className="text_item text_item_inner">Website:</span> <span><a href={isLogged ? `http://${prod.shop.website}` : `#`} target="_blank">{isLogged && prod.shop.website}</a></span>
                      <span className="span_double">   </span>
                      {
                        isLogged && <button className='live_chat'><i className="fa-brands fa-whatsapp"></i> live chat</button>
                      }
                    </p>

                 

                    {
                      !isLogged && <div className='login_to_see'>
                        <img src={locked} alt='' />
                        <p>To Contact Seller Please Sign in</p>
                        <button><Link to="/login">Sign in</Link></button>
                      </div>
                    }
                  </div>

                </div>
              )
            }))
        }

      </div> */}
    </div>
  )
}

export default Listing
