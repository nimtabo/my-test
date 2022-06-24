const mongoose = require('mongoose')


const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter store name!"],
    trim: true,
  },
  // description: {
  //   type: String,
  //   required: [true, "Please enter shop description!"],
  //   trim: true,
  // },
  // address: {
  //   type: String,
  //   required: [true, "Please enter shop address!"],
  //   trim: true,
  // },
  phone: {
    type: String,
    required: [true, "Please enter store phone number!"],
    trim: true,
  },
  website: {
    type: String,
    // required: [true, "Please enter store Website!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter store contact email!"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please enter store city name!"],
    trim: true,
  },
  stateProvince: {
    type: String,
    required: [true, "Please enter store state province!"],
    trim: true,
  },
  // shipmentMethod: {
  //   type: Array,
  //   required: [true, "Please enter shop shipment methods!"],
  //   trim: true,
  // },
  // paymentMethod: {
  //   type: Array,
  //   required: [true, "Please enter shop supported payment methods!"],
  //   trim: true,
  // },
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

let autoPopulateOwner = function (next) {
  this.populate('owner', 'email');
  next();
};

shopSchema.pre('find', autoPopulateOwner);

module.exports = mongoose.model("Shop", shopSchema)