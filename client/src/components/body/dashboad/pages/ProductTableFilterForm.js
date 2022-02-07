import React, { useState, useEffect } from 'react'
import axios from "axios";
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification'


const ProductTableFilterForm = ({ filterStore }) => {
  const [data, setData] = useState({})
  const [makes, setMakes] = useState([])
  const [make, setMake] = useState("")
  const [models, setModels] = useState([])
  const [model, setModel] = useState("")
  const [years, setYears] = useState([])
  const [year, setYear] = useState("")
  const [parts, setParts] = useState([])
  const [part, setPart] = useState("")
  const [err, setErr] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      try {
        const makes = await axios.get('/api/cars/makes');
        setMakes([...makes.data])
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
        parts.splice(0, parts.length)
        setYears([...years])
        setParts([...parts])
        // Reste choices

        setModel('')
        setYear('')
        setPart('')
      } catch (error) {
        // console.log("An Error occured Getting models")
        return setModels([...[]])
      }
    }
    fetchData();
    // Start Filter
    filterStore({ make })
  }, [make]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const years = await axios.post(`/api/cars/${make}/${model}`);
        setYears([...years.data])
        parts.splice(0, parts.length)
        setParts([...parts])
        // Reset Choices
        setYear('')
        setPart('')
      } catch (error) {
        // console.log("An Error occured Getting Years")
        return setYears([...[]])
      }
    }
    fetchData();
    // Start Filter
    filterStore({ make, model })
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
    // Start Filter
    filterStore({ make, model, year })
  }, [year]);
  useEffect(() => {
    // Start Filter
    filterStore({ make, model, year, part })
  }, [part]);

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
