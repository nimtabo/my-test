import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { formatValue } from 'react-currency-input-field';
import { FiLogIn } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { showErrMsg } from '../../utils/notification/Notification'
import { getStateAbriv } from '../../utils/state_cities/index'
import locked from "../../../img/locked.png"
// import 'react-accessible-accordion/dist/fancy-example.css';
import { Rating } from 'react-simple-star-rating'
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
  const [nextPage, setNextPage] = useState(1)
  const [ratingValue, setRatingValue] = useState(0)

  const [data, setData] = useState(initialState)
  // const [home, setHome] = useState({ make: '', model: '', year: '', part: '' })
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasNextpage, setHasNextpage] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)


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
          const prodRes = await axios.get(`/api/product/search/${location.state.make}/${location.state.model}/${location.state.year}/${location.state.part}`, { params: { page: nextPage, limit: 30 } });
          setProducts([...prodRes.data.docs])
          setNextPage(prodRes.data.nextPage)
          setHasNextpage(prodRes.data.hasNextPage)
          setData({ make: location.state.make, model: location.state.model, year: location.state.year, part: location.state.part })
        }
      } catch (error) {
        // console.log("An Error occured getting makes")
        setData({ make: location.state.make, model: location.state.model, year: location.state.year, part: location.state.part })
        setErr("An Error occured getting makes")
        return setTimeout(() => {
          setErr("");
        }, 5000);
        // console.log(error.message)
        // return setMakes([...[]])
      }
    }
    fetchData();
  }, [])

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

  const updateMake = (e) => {
    setMake(e.target.value)
    setData({})
  }

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
        setIsLoading(true)
        products.splice(0, years.length)
        const prodRes = await axios.get(`/api/product/search/${make}/${model}/${year}/${part}`, { params: { page: nextPage, limit: 30 } });
        // console.log("Listing", prodRes.data);
        setProducts([...prodRes.data.docs])
        setNextPage(prodRes.data.nextPage)
        setHasNextpage(prodRes.data.hasNextPage)
        setData({})
      } catch (error) {
        // console.log("An Error occured getting Data")
        // console.log(error.message)
        setErr("No Parts Found!");
        setTimeout(() => {
          setErr("");
        }, 5000);
        return setProducts([...[]])
      } finally {
        setIsLoading(false)
      }
    }

  }

  const loadMore = async () => {
    try {
      setIsLoading(true)
      const prodRes = await axios.get(`/api/product/search/${make || location.state.make}/${model || location.state.model}/${year || location.state.year}/${part || location.state.part}`, { params: { page: nextPage, limit: 30 } });
      setProducts(products => [...products, ...prodRes.data.docs])
      setHasNextpage(prodRes.data.hasNextPage)
      setNextPage(prodRes.data.nextPage)
    } catch (error) {
      setErr("Error Getting Data!");
      return setTimeout(() => {
        setErr("");
      }, 5000);
    } finally {
      setIsLoading(false)
    }

  }

  const updateFilter = async (e) => {
    try {
      const filter = e.target.dataset.filter
      setIsLoading(true)
      const prodRes = await axios.get(`/api/product/search/${make || location.state.make}/${model || location.state.model}/${year || location.state.year}/${part || location.state.part}`, { params: { page: nextPage, limit: 30, filter } });
      setProducts([...prodRes.data.docs])
      setHasNextpage(prodRes.data.hasNextPage)
      setNextPage(prodRes.data.nextPage)
    } catch (error) {
      setErr("Error Getting Data!");
      return setTimeout(() => {
        setErr("");
      }, 5000);
    } finally {
      setIsLoading(false)
    }
  }
  const handleRating = (rate) => {
    setRatingValue(rate)
  }

  const handleReset = () => {
    setRatingValue(2.5)
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
              // defaultValue={make}
              onChange={updateMake}>
              <option>{data.make || "make"}</option>
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
              // defaultValue={location.state.model}
              onChange={(e) => { setModel(e.target.value) }}>
              <option>{data.model || "model"}</option>
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
              value={year}
              // defaultValue={location.state.year}
              onChange={(e) => { setYear(e.target.value) }}>
              <option>{data.year || "year"}</option>
              {/* {years.length === 0 ? <option>model</option> : <option>year</option>} */}
              {
                years.map(year => {
                  return <option key={year}>{year}</option>
                })
              }
            </select>
          </div>


          <div className="listing_left_filter_form_item">
            {/* <label htmlFor="part">Part: </label> */}
            <select name="part"
              value={part}
              // defaultValue={location.state.part}
              onChange={(e) => { setPart(e.target.value) }}
            >
              <option>{data.part || "part"}</option>
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

      <div className='list_right_filter'
        onClick={() => { setOpenFilter(!openFilter) }}
      >
        <IoFilterSharp />
        <span>Filter</span>
      </div>
      {
        openFilter
        &&
        <ul className='list_right_filter_items'
          onClick={updateFilter}
        >
          <li data-filter="low">lowest price</li>
          <li data-filter="high">Highest price</li>
          <li data-filter="date">date</li>
        </ul>
      }


      <div className='list_table'>
        <div className='headers'>
          <div>IMAGE</div>
          <div>SELLER</div>
          <div>RATING</div>
          <div>CITY</div>
          {/* <div>STATE</div> */}
          <div>PHONE</div>
          <div>EMAIL</div>
          <div>DESCRIPTION</div>
          <div>PRICE</div>
          <div>CHAT</div>
        </div>

        <div className='list_items'>
          <Accordion allowZeroExpanded>
            {
              products.length < 1 ? (
                <div className='listing_item'>
                  <h2>No parts Found</h2>
                </div>
              ) : (products.map(prod => {
                return isLogged ? (
                  <AccordionItem key={prod._id}>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <AccordionItemState>
                          {({ expanded }) => (expanded ?
                            <div key={prod._id} className='list_item'>
                              <div><img className='expand_img' src={prod.multiple_image[0]} /></div>
                              <div className='word_break'>{prod.shop.name}</div>
                              <div>
                                <p>3.5(130)</p>
                                <Rating
                                  onClick={handleRating}
                                  initialValue={3.5}
                                  ratingValue={ratingValue}
                                  allowHalfIcon
                                />
                              </div>
                              <div>{`${prod.shop.city} , ${getStateAbriv(prod.shop.stateProvince)}`}</div>
                              {/* <div>{prod.shop.stateProvince}</div> */}
                              <div>{prod.shop.phone}</div>
                              <div className='word_break'>{prod.shop.owner.email}</div>
                              <div className='word_break'>{prod.description}</div>
                              <div>{formatValue({
                                value: `${prod.price}`,
                                groupSeparator: ',',
                                decimalSeparator: '.',
                                prefix: '$',
                              })}</div>
                              <div><i className="fas fa-comment-dots"></i></div>
                            </div>
                            :
                            <div key={prod._id} className='list_item'>
                              <div><img src={prod.multiple_image[0]} /></div>
                              <div className='word_break'>{prod.shop.name.substring(0, 13)}...</div>
                              <div>3.5(130)</div>
                              <div>{`${prod.shop.city} , ${getStateAbriv(prod.shop.stateProvince)}`.substring(0, 26)}</div>
                              {/* <div>{prod.shop.stateProvince}</div> */}
                              <div>{prod.shop.phone}</div>
                              <div className='word_break'>{prod.shop.owner.email.substring(0, 13)}</div>
                              <div className='word_break'>{prod.description.substring(0, 25)}...</div>
                              <div>{formatValue({
                                value: `${prod.price}`,
                                groupSeparator: ',',
                                decimalSeparator: '.',
                                prefix: '$',
                              })}</div>
                              <div><i className="fas fa-comment-dots"></i></div>
                            </div>)}
                        </AccordionItemState>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    {/* <AccordionItemPanel>
                      
                    </AccordionItemPanel> */}
                  </AccordionItem>
                ) : (
                  <AccordionItem key={prod._id}>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <AccordionItemState>
                          {({ expanded }) => (expanded ?
                            <div key={prod._id} className='list_item_a'>
                              <div><img className='expand_img' src={prod.multiple_image[0]} /></div>
                              <div>
                                <p className='login_hiden expand'>
                                  <img src={locked} alt='' />
                                  <span>To Contact Seller Please Sign in</span>
                                  <button><FiLogIn /><Link to="/login">Sign in</Link></button>
                                </p>
                              </div>
                              <div className='word_break'>{prod.description}</div>
                              <div>{formatValue({
                                value: `${prod.price}`,
                                groupSeparator: ',',
                                decimalSeparator: '.',
                                prefix: '$',
                              })}</div>
                              {/* <div><i className="fas fa-comment-dots"></i></div> */}
                            </div>
                            :
                            <div key={prod._id} className='list_item_a'>
                              <div><img src={prod.multiple_image[0]} /></div>
                              <div>
                                <p className='login_hiden'>
                                  <img src={locked} alt='' />
                                  <span>To Contact Seller Please Sign in</span>
                                  <button><FiLogIn /><Link to="/login">Sign in</Link></button>
                                </p>
                              </div>
                              <div className='word_break'>{prod.description.substring(0, 25)}...</div>
                              <div>{formatValue({
                                value: `${prod.price}`,
                                groupSeparator: ',',
                                decimalSeparator: '.',
                                prefix: '$',
                              })}</div>
                              {/* <div><i className="fas fa-comment-dots"></i></div> */}
                            </div>
                          )}
                        </AccordionItemState>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    {/* <AccordionItemPanel>
                      
                    </AccordionItemPanel> */}
                  </AccordionItem>
                )
              })
              )}

          </Accordion>
          {
            isLoading ? <p className='load_more'>Loading...</p> :
              hasNextpage && <button onClick={loadMore} className='load_more'>Load More...</button>
          }

        </div>

      </div>

    </div>
  )
}

export default Listing
