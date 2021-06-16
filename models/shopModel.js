const mongoose = require('mongoose')


const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter shop name!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter shop description!"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter shop address!"],
    trim: true,
  },
  phone: {
    type: Array,
    required: [true, "Please enter shop contact phone numbers!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter shop contact email!"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please enter shop city name!"],
    trim: true,
  },
  stateProvince: {
    type: String,
    required: [true, "Please enter shop state province!"],
    trim: true,
  },
  shipmentMethod: {
    type: Array,
    required: [true, "Please enter shop shipment methods!"],
    trim: true,
  },
  paymentMethod: {
    type: Array,
    required: [true, "Please enter shop supported payment methods!"],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
  ,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    }
  ],
}, {
  timestamps: true
})

module.exports = mongoose.model("Shops", shopSchema)