// let express = require('express');
// let mongoose = require('mongoose');
// let router = express.Router();

let File = require('../models/fileModel');
let productModel = require('../models/productModel')


// const uploadCtr = {
//   uploadImages: async (req, res, next) => {
//     const reqFiles = [];
//     try {
//       const url = req.protocol + '://' + req.get('host')

//       console.log(req.files)

//       // for (var i = 0; i < req.files.length; i++) {
//       //   reqFiles.push(url + '/public/' + req.files[i].filename)
//       // }

//       // const newFile = new File({
//       //   _id: new mongoose.Types.ObjectId(),
//       //   imagesArray: reqFiles
//       // });


//       // const result = await newFile.save()
//       // console.log(result)
//       // res.status(201).json({
//       //   message: "Uploaded!",
//       //   fileCreated: {
//       //     _id: result._id,
//       //     imagesArray: result.imagesArray
//       //   }
//       // })
//     } catch (err) {
//       // console.log(err),
//       res.json({
//         error: err.message
//       });
//     }
//   },
//   getImages: async (req, res, next) => {
//     try {
//       images = await File.find()

//       res.status(200).json({
//         message: "Images fetched!",
//         posts: images
//       });
//     } catch (error) {

//     }
//   }
// }

// module.exports = uploadCtr;


// "use strict";
// const multipleFilesModal = require("../modals/multipleFiles");
// const SingleFileModal = require("../modals/singleFile");

// POST REQUEST HANDLERS
//Single File
// const singleFileUpload = async (req, res, next) => {
//   try {
//     const file = new SingleFileModal({
//       fileName: req.file.originalname,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,

//       fileSize: fileSizeFormatter(req.file.size, 2),
//     });
//     await file.save(); //save the file in database
//     // console.log("file in controller", file);
//     res.status(201).send("file uploaded successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };
// Multiple Files
const MultipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,

        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new File({
      product: req.params.id,
      files: filesArray,
    });


    const savedFiles = await multipleFiles.save();
    await productModel.findByIdAndUpdate(
      req.params.id,
      // { shops: savedShop._id }
      { $addToSet: { imgs: savedFiles._id } }
    )
    res.status(201).send("files uploaded successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

// size formatter
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes == 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(100, index)).toFixed(dm)) + " " + sizes[index]
  );
};

//GET REQUEST HANDLER
// const getAllSingelFiles = async (req, res, next) => {
//   try {
//     const files = await SingleFileModal.find(); // get all files
//     res.status(200).send(files);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };
const getAllMultipleFiles = async (req, res, next) => {
  try {
    const files = await File.find(); // get all files
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  // singleFileUpload,
  MultipleFileUpload,
  // getAllSingelFiles,
  getAllMultipleFiles,
};
