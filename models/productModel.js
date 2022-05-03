const mongoosePaginate = require('mongoose-paginate-v2');
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
    maxLength: 10
  },
  partNumber: {
    type: String,
    // required: [true, "Please enter part number!"],
    trim: true,
    maxLength: 32,
  },
  description: {
    type: String,
    // required: [true, "Please enter description!"],
    trim: true,
    maxLength: 150,
  },
  // isAvailable: {
  //   type: Number,
  //   default: 1
  // },
  // isArchived: {
  //   type: Number,
  //   default: 0
  // },
  // isOnHold: {
  //   type: Number,
  //   default: 0
  // },
  availability: {
    type: Number,
    default: 0 // 0=available, 1=Sold_Out, 2=On_Hold, 3=Archive
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
  },
  multiple_image: {
    type: []
  }
}, {
  timestamps: true
})

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Products", productSchema)
