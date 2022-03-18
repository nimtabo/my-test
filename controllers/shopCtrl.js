const _ = require("underscore");
const fs = require("fs");
const vm = require("v-response");
const upload = require("../middleware/helper").upload;

// 
const User = require('../models/userModel')
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')
const imageUpload = require('../helpers/imageUpload')


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
  addProduct: async (req, res, next) => {
    // 
    // if (!req.files || _.isEmpty(req.files)) {
    //   return res.status(400)
    //     .json(vm.ApiResponse(false, 400, "No Image uploaded'"))
    // }
    // const files = req.files;
    try {
      // let urls = [];
      // let multiple = async (path) => await upload(path);
      // for (const file of files) {
      //   const { path } = file;

      //   const newPath = await multiple(path);
      //   urls.push(newPath);
      //   fs.unlinkSync(path);
      // }

      const url = await imageUpload.uploadAvatar(req.files.file)
      if (url) {
        // *****************
        const { make, model, part, partNumber, description, price, year } = req.body;
        if (isNaN(price)) return res.status(400).json({ msg: "Price must be Number" })
        // ****
        // let bodyw = _.extend({ make, model, part, partNumber, description, price, year }, { multiple_image: urls });

        let newProduct = new Product({ make, model, part, partNumber, description, price, year, multiple_image: [url] });

        const { shopId } = req.params;
        newProduct.shop = shopId;

        await newProduct.save()
          .then(saved => {
            Shop.findByIdAndUpdate(
              shopId,
              { $addToSet: { products: saved._id } }
            )
            return res.json({ success: true, message: "Product added" });
          }).catch(error => {
            return res.json(error);
          })

      }
      if (!url) {
        // return res.status(400)
        //   .json(vm.ApiResponse(false, 400, ""))
        return res.json({ success: false, message: "Image URL Error", url });
      }

    } catch (e) {
      console.log("err :", e);
      return next(e);
      // return res.json({ success: false, message: "Image URL Error", error: e });
    }
    // 
    // try {
    //   const { make, model, part, partNumber, description, price, year } = req.body;

    //   if (isNaN(price)) return res.status(400).json({ msg: "Price must be Number" })

    //   const newProduct = new Product({
    //     make,
    //     model,
    //     year,
    //     part,
    //     partNumber,
    //     description,
    //     price,
    //   });

    //   const { shopId } = req.params;
    //   newProduct.shop = shopId;

    //   const savedProduct = await newProduct.save();
    //   const updateShopProduct = await Shop.findByIdAndUpdate(
    //     shopId,
    //     { $addToSet: { products: savedProduct._id } }
    //   )
    //   // console.log(updateShopProduct)
    //   res.json(savedProduct);
    // } catch (err) {
    //   res.status(500).json({ msg: err.message });
    // }
  },
  getAvailableProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, availability: 0 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getArchivedProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, availability: 3 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getSoldOutProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, availability: 1 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getOnHoldProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const products = await Product.find({ shop: shopId, availability: 2 });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getFilterProducts: async (req, res) => {
    try {
      const { shopId } = req.params;
      const { make, model, part, year, availability } = req.body;

      let data = { shop: shopId, availability: Number(availability) }

      if (!make) return res.json({ message: "No filter keywords!" })

      if (make) {
        data.make = make
      }
      if (model) {
        data.model = model
      }
      if (year) {
        data.year = year
      }
      if (part) {
        data.part = part
      }

      const products = await Product.find(data);
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
  deleteProductImage: async (req, res, next) => {
    try {
      const { shopId, productId } = req.params;
      const { url } = req.body;

      const product = await Product.find({ shop: shopId, _id: productId });
      // console.log(product[0].multiple_image)

      let updatedImages = product[0].multiple_image.filter(item => url !== item)

      await Product.findOneAndUpdate({ shop: shopId, _id: productId }, { multiple_image: updatedImages })
      res.json({ message: "image deleted", success: "ok" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Image not deleted" })
    }
  },
  updateProductWithImage: async (req, res) => {
    const files = req.files;

    try {
      // let urls = [];
      // let multiple = async (path) => await upload(path);
      // for (const file of files) {
      //   const { path } = file;

      //   const newPath = await multiple(path);
      //   urls.push(newPath);
      //   fs.unlinkSync(path);
      // }

      // if (urls) {
      // try {
      const url = await imageUpload.uploadAvatar(req.files.file)

      const { partNumber, description, price, availability } = req.body;
      const { shopId, productId } = req.params;

      if (parseInt(availability) === 4) {
        // try {
        await Product.findOneAndDelete({ shop: shopId, _id: productId })

        return res.json({ message: "Product Deleted from Shop Successfully!" })
        // } catch (err) {
        //   return res.status(500).json({ msg: err.message })
        // }
      }

      // **********
      if (url) {
        // if (urls.length > 0) {
        // let updateItems = _.extend({ partNumber, description, price, availability }, { multiple_image: urls });
        let updateItems = { partNumber, description, price, availability, multiple_image: [url] };

        // const updateItems = { partNumber, description, price, availability };

        const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, updateItems);
        return res.json({ message: "Product Updated successfully." });
        // }
        // let updateItems = _.extend({ partNumber, description, price, availability }, { multiple_image: url });
        // const updateItems = { partNumber, description, price, availability };

        // const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, updateItems);
        // return res.json({ message: "Product Updated successfully." });
        // }
      }
      let updateItems = { partNumber, description, price, availability };

      const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, updateItems);
      return res.json({ message: "Product Updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateProduct: async (req, res) => {

    try {
      const { partNumber, description, price, availability } = req.body;
      const { shopId, productId } = req.params;

      if (parseInt(availability) === 4) {
        await Product.findOneAndDelete({ shop: shopId, _id: productId })

        return res.json({ message: "Product Deleted from Shop Successfully!" })
      }

      // **********
      let updateItems = { partNumber, description, price, availability };

      const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, updateItems);
      return res.json({ message: "Product Updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateProductAvailability: async (req, res) => {
    try {
      const { availability, productIds } = req.body;
      const { shopId, productId } = req.params;

      // const updatedProduct = await Product.findOneAndUpdate({ shop: shopId, _id: productId }, { availability: Number(availability) });
      const updatedProduct = await Product.updateMany(
        { shop: shopId, _id: { $in: productIds } },
        { $set: { availability: Number(availability) } },
        { multi: true }
      )
      res.json({ message: "Product Updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  moveProductToArchive: async (req, res) => {
    console.log(req.params)
    try {
      const { shopId, productId } = req.params;
      await Product.findOneAndUpdate({ shop: shopId, _id: productId }, { isArchived: 1, isAvailable: 0 })

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