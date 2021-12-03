const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  imagesArray: {
    type: Array
  },
  // ad: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Products"
  // }
}, {
  collection: 'files',
  timestamps: true
})

module.exports = mongoose.model('File', fileSchema)