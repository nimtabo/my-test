import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification'


const ProductTableFilterForm = () => {
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
  const [err, setErr] = useState("")

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

  return (
    <div className="table_search">
      <div className="modal_field">
        {/* <label htmlFor="make">make: </label> */}
        <select
          name="make"
          id="make"
          // className="hero-make"
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
        {/* <label htmlFor="model">model: </label> */}
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
        {/* <label htmlFor="year">year: </label> */}
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
        {/* <label htmlFor="part">part: </label> */}
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
  )
}

export default ProductTableFilterForm
