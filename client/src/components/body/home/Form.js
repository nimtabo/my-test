import React, { useEffect, useState } from 'react'

const Form = () => {
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [year, setYear] = useState([])

  return (
    <div>
      <form>
        <div>
          <h2>FIND YOUR PARTS NOW</h2>
        </div>
        <div >
          <label htmlFor="MAKE" className="labels">MAKE<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="MAKE" className="hero-make">
            <option>MAKE1</option>
            <option>MAKE2</option>
          </select>
        </div>

        <div>
          <label htmlFor="MODEL" className="labels">MODEL<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="MODEL" className="hero-model">
            <option>MODEL1</option>
            <option>MODEL2</option>
          </select>
        </div>

        <div>
          <label htmlFor="YEAR" className="labels">YEAR<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="YEAR" className="hero-year">
            <option>YEAR1</option>
            <option>YEAR2</option>
          </select>
        </div>

        <div>
          <label htmlFor="PART" className="labels">PART<span className="asterisk"><sup>*</sup></span>: </label>
          <select id="PART" className="hero-part">
            <option>PART1</option>
            <option>PART2</option>
          </select>
        </div>

        <div>
          <label htmlFor="zip-code" className="labels">ZIP CODE<span className="asterisk"><sup>*</sup></span>: </label>
          <input id="zip-code" />
        </div>

        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  )
}

export default Form

