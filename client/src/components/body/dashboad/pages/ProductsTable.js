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
              <option>Part Number</option>
              <option>Part Number</option>
              <option>Part Number</option>
            </select>
          </div>


          <div>
            <select>
              <option>Part</option>
              <option>Part</option>
              <option>Part</option>
            </select>
          </div>

        </div>

        <div className="add_product_btn">
          <button>Add Part</button>
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
              {/* <input type="checkbox" /> */}
            </th>
            <th>Image</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Part Name</th>
            <th>Part Number</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td className="part_image"></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>Machine Screw"</td>
            <td>222222100</td>
            <td>Hardware</td>
            <td>$200</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td className="part_image"></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>Machine Screw"</td>
            <td>222222100</td>
            <td>Hardware</td>
            <td>$200</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td className="part_image"></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>Machine Screw"</td>
            <td>222222100</td>
            <td>Hardware</td>
            <td>$200</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td className="part_image"></td>
            <td>ALFA ROMEO</td>
            <td>4C</td>
            <td>2015</td>
            <td>Machine Screw"</td>
            <td>222222100</td>
            <td>Hardware</td>
            <td>$200</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default ProductsTable
