const User = require('../models/userModel')
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')

const shopCtrl = {
  createShop: async (req, res) => {
    try {
      const {
        name,
        description,
        address,
        phone,
        email,
        city,
        stateProvince,
        shipmentMethod,
        paymentMethod,
      } = req.body;

      const newShop = new Shop({
        name,
        description,
        address,
        phone,
        email,
        city,
        stateProvince,
        shipmentMethod,
        paymentMethod,
        owner: req.user.id,
      });
      const userId = req.user.id;
      const savedShop = await newShop.save();
      const updateUserShops = await User.findByIdAndUpdate(
        userId,
        // { shops: savedShop._id }
        { $addToSet: { shops: savedShop._id } }
      )
      // console.log({ "user_shop_updated": updateUserShops })
      res.json({ msg: "Shop Created Successfully!" })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllShops: async (req, res) => {
    try {
      const shops = await Shop.findOne({ owner: req.user.id });
      if (!shops) {
        return res.status(400).json({
          message: "No Shop exist!",
        });
      }
      // console.log(shops._id)
      res.json(shops._id);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getShop: async (req, res) => {
    try {
      const shop = await Shop.find({ owner: req.user.id, _id: req.params.id });
      if (!shop) {
        return res.status(400).json({
          message: "Shop doesn't exist!",
        });
      }
      res.json(shop);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateShop: async (req, res) => {
    try {
      const {
        name,
        description,
        address,
        phone,
        email,
        city,
        stateProvince,
        shipmentMethod,
        paymentMethod,
      } = req.body;
      // if (name || description || address || phone || email || city || stateProvince || shipmentMethod || paymentMethod) {
      await Shop.findOneAndUpdate({ owner: req.user.id, _id: req.params.id }, {
        name,
        description,
        address,
        phone,
        email,
        city,
        stateProvince,
        shipmentMethod,
        paymentMethod,
      })
      res.json({ msg: "Shop Update Success!" })
      // }
      // return res.status(400).json({ msg: "Nothing to update" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteShop: async (req, res) => {
    try {
      await Shop.findOneAndDelete({ owner: req.user.id, _id: req.params.id })

      res.json({ msg: "Shop Deleted Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addProduct: async (req, res) => {
    try {
      const { make, model, part, partNumber, description, price, year } = req.body;

      if (isNaN(partNumber) || isNaN(price)) return res.status(400).json({ msg: "Part Number and Price must be Number" })

      const newProduct = new Product({
        make,
        model,
        year,
        part,
        partNumber,
        description,
        price,
        // category,
        // grade,
        // stock,
      });

      const { shopId } = req.params;
      newProduct.shop = shopId;

      const savedProduct = await newProduct.save();
      const updateShopProduct = await Shop.findByIdAndUpdate(
        shopId,
        { $addToSet: { products: savedProduct._id } }
      )
      // console.log(updateShopProduct)
      res.json(savedProduct);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAvailableProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, isArchived: 0, isAvailable: 1 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getArchivedProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, isArchived: 1, });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getSoldOutProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, isAvailable: 0 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getOnHoldProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, isOnHold: 1 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProduct: async (req, res) => {
    try {
      const { shopId, productId } = req.params;
      const product = await Product.find({ shop: shopId, _id: productId });
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
  updateProduct: async (req, res) => {
    try {
      const { make, model, part, partNumber, description, price, year, isAvailable } = req.body;
      const { shopId, productId } = req.params;

      const updateItems = { make, model, part, partNumber, description, price, year, isAvailable: Number(isAvailable) };
      if (Number(isAvailable) === 1) {
        updateItems.isArchived = 0;
      } else if (Number(isAvailable) === 0) {
        updateItems.isArchived = 1;
      }

      if (Number(isAvailable) === 2) {
        updateItems.isOnHold = 1;
      }
      const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, updateItems);

      res.json({ message: "Product Updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateProductAvailability: async (req, res) => {
    try {
      const { isAvailable } = req.body;
      const { shopId, productId } = req.params;

      const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, { isAvailable: Number(isAvailable) });

      res.json({ message: "Product Updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  moveProductToArchive: async (req, res) => {
    console.log(req.params)
    try {
      const { shopId, productId } = req.params;
      await Product.findOneAndUpdate({ shop: shopId, _id: productId }, { isArchived: 1 })

      res.json({ msg: "Product moved to Archives Successfully!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { shopId, productId } = req.params;
      await Product.findOneAndDelete({ shop: shopId, _id: productId })

      res.json({ msg: "Product Deleted from Shop Successfully!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  // ************ ADMIN CTRL ***********
  adminGetAllShops: async (req, res) => {
    try {
      const shops = await Shop.find({ owner: req.params.userId });
      if (!shops) {
        return res.status(400).json({
          message: "No Shop exist!",
        });
      }
      res.json(shops);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  adminGetShop: async (req, res) => {
    try {
      const shop = await Shop.find({ owner: req.params.userId, _id: req.params.shopId });
      if (!shop) {
        return res.status(400).json({
          message: "Shop doesn't exist!",
        });
      }
      res.json(shop);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  adminUpdateShop: async (req, res) => {
    try {
      const {
        name,
        description,
        address,
        phone,
        email,
        city,
        stateProvince,
        shipmentMethod,
        paymentMethod,
      } = req.body;
      // if (name || description || address || phone || email || city || stateProvince || shipmentMethod || paymentMethod) {
      await Shop.findOneAndUpdate({ owner: req.params.userId, _id: req.params.shopId }, {
        name,
        description,
        address,
        phone,
        email,
        city,
        stateProvince,
        shipmentMethod,
        paymentMethod,
      })
      res.json({ msg: "Shop Update Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  adminDeleteShop: async (req, res) => {
    try {
      await Shop.findOneAndDelete({ owner: req.params.userId, _id: req.params.shopId })

      res.json({ msg: "Shop Deleted Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  // ********
  adminGetAllShopProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  adminGetProduct: async (req, res) => {
    try {
      const { shopId, productId } = req.params;
      const product = await Product.find({ shop: shopId, _id: productId });
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
  adminUpdateProduct: async (req, res) => {
    try {
      const { make, stock, model, part, engine, grade, price, year } = req.body;
      const updateItems = { make, stock, model, part, engine, grade, price, year };
      const { shopId, productId } = req.params;

      const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, updateItems);

      res.json({ message: "Product Updated successfully.", product: updatedProduct });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  adminDeleteProduct: async (req, res) => {
    try {
      const { shopId, productId } = req.params;
      await Product.findOneAndDelete({ shop: shopId, _id: productId })

      res.json({ msg: "Product Deleted from Shop Successfully!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = shopCtrl;