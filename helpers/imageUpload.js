const cloudinary = require('cloudinary')
const fs = require('fs')
const _ = require('underscore');
const Q = require("q");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})



const uploadImage = {
  uploadAvatar: async (file) => {

    return new Q.Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'avatar', width: 200, height: 200, crop: "fill" }, (err, res) => {
        if (err) {
          console.log('cloudinary err:', err);
          reject(err);
        } else {
          // console.log('cloudinary res:', res);
          removeTmp(file.tempFilePath)
          return resolve(res.url);
        }
      });
    });

    // try {
    //   // const file = req.files.file;
    //   cloudinary.v2.uploader.upload(file.tempFilePath, {
    //     folder: 'avatar', width: 200, height: 200, crop: "fill"
    //   }, async (err, result) => {
    //     if (err) throw err;

    //     removeTmp(file.tempFilePath)

    //     // res.json({ url: result.secure_url })
    //     return { url: result.secure_url, error: '' }
    //   })

    // } catch (err) {
    //   return { error: err.message, url: '' }
    // }
  }

}


const removeTmp = (path) => {
  fs.unlink(path, err => {
    if (err) throw err
  })
}

module.exports = uploadImage