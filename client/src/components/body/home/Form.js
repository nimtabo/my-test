import React from 'react'

const Form = () => {
  return (
    <div>
      <form>
        <div >
          <label htmlFor="MAKE" className="labels">MAKE: </label>
          <select id="MAKE" className="hero-make">
            <option>MAKE1</option>
            <option>MAKE2</option>
          </select>
        </div>

        <div>
          <label htmlFor="MODEL" className="labels">MODEL: </label>
          <select id="MODEL" className="hero-model">
            <option>MODEL1</option>
            <option>MODEL2</option>
          </select>
        </div>

        <div>
          <label htmlFor="YEAR" className="labels">YEAR: </label>
          <select id="YEAR" className="hero-year">
            <option>YEAR1</option>
            <option>YEAR2</option>
          </select>
        </div>

        <div>
          <label htmlFor="PART" className="labels">PART: </label>
          <select id="PART" className="hero-part">
            <option>PART1</option>
            <option>PART2</option>
          </select>
        </div>

        <div>
          <label htmlFor="zip-code" className="labels">ZIP CODE: </label>
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

//TODO fix footer > remove contact us, add customers, email --- all texts
// restore services link
//TODO About us Team
//TODO HEADER == services dropdown btn
//TODO Search btn HERO SECTION