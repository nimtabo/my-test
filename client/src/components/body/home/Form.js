import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { showErrMsg } from '../../utils/notification/Notification'

const Form = () => {
  const [data, setData] = useState({})
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
  const [zipcode, setZipcode] = useState("")
  const [err, setErr] = useState("")

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makes = await axios.get('/api/cars/makes');
        setMakes([...makes.data])
      } catch (error) {
        // console.log("An Error occured getting makes")
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

  useEffect(() => {
    const data = { make, model, year, part }
    setData({ ...data })
  }, [part]);


  // useEffect(() => {
  //   setData({ ...data, zipcode })
  //   console.log(zipcode)
  // }, [zipcode]);


  // useEffect(() => {
  //   console.log(data)
  // }, [data]);

  const onSubmit = (e) => {
    e.preventDefault()

    if ((make === "" || make === "Select make") || (model === "" || model === "Select a make" || model === "Select model") || (year === "" || year === "Select a model" || year === "Select year") || (part === "" || part === "Select category" || part === "Select part")) {
      // const data = { make, model, year, engine, category, part }
      // console.log(data)
      return setErr("All marked fields are required");
    } else {
      const data = { make, model, year, part }
      // console.log(data)
      // setErr("Go to LISTING PAGE")
      return history.push({ pathname: "/listing", state: data })
    }

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {err ? showErrMsg(err) : <h2>FIND YOUR PARTS NOW</h2>}
        </div>
        <div >
          <label htmlFor="MAKE" className="labels">MAKE<span className="asterisk"><sup>*</sup></span>: </label>
          <select
            id="MAKE"
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

        <div>
          <label htmlFor="MODEL" className="labels">MODEL<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="MODEL"
            className="hero-model"
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

        <div>
          <label htmlFor="YEAR" className="labels">YEAR<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="YEAR" className="hero-year"
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

        {/* <div>
          <label htmlFor="PART" className="labels">ENGINE<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="PART" className="hero-part"
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

        {/* <div>
          <label htmlFor="PART" className="labels">CATEGORY<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="PART" className="hero-part"
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

        <div>
          <label htmlFor="PART" className="labels">PART<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="PART" className="hero-part"
            value={part}
            onChange={(e) => { setPart(e.target.value) }}
          >
            {parts.length === 0 ? <option>Select Year</option> : <option>Select part</option>}
            {
              parts.map(part => {
                return <option key={part}>{part}</option>
              })
            }
          </select>
        </div>

        {/* <div>
          <label htmlFor="zip-code" className="labels">ZIP CODE<span className="asterisk"><sup>*</sup></span>: </label>
          <input id="zip-code" value={zipcode} onChange={(e) => { setZipcode(e.target.value) }} />
        </div> */}

        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  )
}

export default Form

