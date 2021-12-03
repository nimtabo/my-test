let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

let File = require('../models/fileModel');


const uploadCtr = {
  uploadImages: async (req, res, next) => {
    const reqFiles = [];
    try {
      const url = req.protocol + '://' + req.get('host')

      console.log(req.files)

      // for (var i = 0; i < req.files.length; i++) {
      //   reqFiles.push(url + '/public/' + req.files[i].filename)
      // }

      // const newFile = new File({
      //   _id: new mongoose.Types.ObjectId(),
      //   imagesArray: reqFiles
      // });


      // const result = await newFile.save()
      // console.log(result)
      // res.status(201).json({
      //   message: "Uploaded!",
      //   fileCreated: {
      //     _id: result._id,
      //     imagesArray: result.imagesArray
      //   }
      // })
    } catch (err) {
      // console.log(err),
      res.status(500).json({
        error: err.message
      });
    }
  },
  getImages: async (req, res, next) => {
    try {
      images = await File.find()

      res.status(200).json({
        message: "Images fetched!",
        posts: images
      });
    } catch (error) {

    }
  }
}

module.exports = uploadCtr;