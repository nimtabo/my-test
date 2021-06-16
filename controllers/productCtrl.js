const Product = require('../models/productModel')
const Shop = require('../models/shopModel')

const productCtrl = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({}).populate('shop');
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
      const { make, model, year, engine, category } = req.params;
      const products = await Product.findById({ make: make, model: model, year: year, engine: engine, category: category }).populate('shop');
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