import React from 'react'
import './table.css'

const ProductsTable = () => {
  return (
    <div>
      <div className="table_controls">

        <div className="table_search">
          <div>
            <select>
              <option>make</option>
              <option>make</option>
              <option>make</option>
            </select>
          </div>

          <div>
            <select>
              <option>model</option>
              <option>model</option>
              <option>model</option>
            </select>
          </div>

          <div>
            <select>
              <option>year</option>
              <option>year</option>
              <option>year</option>
            </select>
          </div>

          <div>
            <select>
              <option>Engine</option>
              <option>Engine</option>
              <option>Engine</option>
            </select>
          </div>

          <div>
            <select>
              <option>Category</option>
              <option>Category</option>
              <option>Category</option>
            </select>
          </div>

          <div>
            <select>
              <option>Part</option>
              <option>Part</option>
              <option>Part</option>
            </select>
          </div>

          <div>
            <select>
              <option>Grade</option>
              <option>Grade</option>
              <option>Grade</option>
            </select>
          </div>

        </div>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>
              <select>
                <option>Select Action</option>
                <option>Delete</option>
                <option>Sold out</option>
                <option>Available</option>
              </select>
            </th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Engine</th>
            <th>Category</th>
            <th>Part</th>
            <th>Grade</th>
            <th>Price</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>1.7L L4 Turbocharged</td>
            <td>Hardware</td>
            <td>Machine Screw"</td>
            <td>A</td>
            <td>$200</td>
            <td>10</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>1.7L L4 Turbocharged</td>
            <td>Hardware</td>
            <td>Machine Screw"</td>
            <td>A</td>
            <td>$200</td>
            <td>10</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>1.7L L4 Turbocharged</td>
            <td>Hardware</td>
            <td>Machine Screw"</td>
            <td>A</td>
            <td>$200</td>
            <td>10</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>1.7L L4 Turbocharged</td>
            <td>Hardware</td>
            <td>Machine Screw"</td>
            <td>A</td>
            <td>$200</td>
            <td>10</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default ProductsTable
