const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./Uploads/");
  },
  filename: function (req, file, callback) {
    // console.log("multer file:", file);
    callback(null, file.originalname);
  }
});
let maxSize = 1000000 * 1000;

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  }
});
