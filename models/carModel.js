const mongoose = require('mongoose')


const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, "Please enter car make!"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Please enter car model!"],
    trim: true,
  },
  engine: {
    type: String,
    required: [true, "Please enter car engine!"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Please enter car category!"],
    trim: true,
  },
  parts: [],
  years: [],
}, {
  timestamps: true
})

module.exports = mongoose.model("Cars", carSchema)