const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, "Please enter make!"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Please enter model!"],
    trim: true,
  },
  year: {
    type: String,
    required: [true, "Please enter year!"],
    trim: true,
  },
  part: {
    type: String,
    required: [true, "Please enter part!"],
    trim: true,
  },
  price: {
    type: String,
    required: [true, "Please enter price!"],
    trim: true,
  },
  partNumber: {
    type: String,
    required: [true, "Please enter part number!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter description!"],
    trim: true,
  },
  isAvailable: {
    type: Number,
    default: 1
  },

  // grade: {
  //   type: String,
  //   required: [true, "Please enter grade!"],
  //   trim: true,
  // },
  // engine: {
  //   type: String,
  //   required: [true, "Please Enter Engine"],
  //   trim: true,
  // },
  // category: {
  //   type: String,
  //   required: [true, "Please Enter Part Category"],
  //   trim: true,
  // },
  // stock: {
  //   type: Number,
  //   required: [true, "Please enter avilable stocks!"],
  //   trim: true,
  // },
  shop:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Products", productSchema)