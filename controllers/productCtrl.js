const { PaginationParameters } = require('mongoose-paginate-v2');
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
      // MONGOOSE PAGNATION
      // ******************
      const options = new PaginationParameters(req).get()[1]

      options.populate = 'shop'
      options.sort = { createdAt: -1 }

      const products = await Product.paginate({ make, model, year, part, availability: 0 }, options);

      if (!products.docs.length) {
        return res.status(400).json({
          message: "No Products exist!",
        });
      }

      res.json(products)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = productCtrl;