import React from 'react'
import Dashboad from '../Dashboad'



import './shop.css'
import ProductForm from './ProductForm'
import ProductsTable from './ProductsTable'




function Products() {
  // *********
  // **********
  return (
    <div className="dashboad_page">
      <div id="main">
        <Dashboad>

          <div className="shop_window">
            <h1>Products Ads</h1>
            {/* **** */}
            <div className="add_product_btn">
              <button>Add product</button>
            </div>
            {/* <ProductForm /> */}
            <ProductsTable />
            {/* **** */}
          </div>
        </Dashboad>
      </div>
    </div>
  )
}

export default Products
