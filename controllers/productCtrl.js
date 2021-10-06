const Product = require('../models/productModel')
const Shop = require('../models/shopModel')

const productCtrl = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 }).populate('shop', { __v: 0, owner: 0 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById({ _id: id }).populate('shop');
      if (!product) {
        return res.status(400).json({
          message: "Product does not exist!",
        });
      }
      res.json(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  searchProduct: async (req, res) => {
    try {
      const { make, model, year, engine, category, part } = req.params;
      // if (engine === 'null' && category === 'null') {
      //   if (make === '' || model === '' || year === '' || part === '') {
      //     return res.status(404).json({
      //       message: "All fields are required!",
      //     });
      //   }
      //   // http://localhost:5000/api/product/search/BENTLEY/AZURE/2001/6.7L V8 Turbocharged/Engine/Oil Filter
      //   const products = await Product.find({ make, model, year, part }).populate('shop', { __v: 0, owner: 0 });
      //   res.json(products);
      // } else {
      //   const products = await Product.find({ make, model, year, engine, category, part }).populate('shop', { __v: 0, owner: 0 });
      //   if (!products) {
      //     return res.status(400).json({
      //       message: "No Products exist!",
      //     });
      //   }
      //   res.json(products);
      // }
      // console.log(req.params)
      const products = await Product.find({ make, model, year, part }).populate('shop', { __v: 0, owner: 0 });
      if (!products) {
        return res.status(400).json({
          message: "No Products exist!",
        });
      }
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = productCtrl;