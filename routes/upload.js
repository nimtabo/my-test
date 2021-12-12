const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadImages = require('../middleware/uploadImages')
const uploadCtrl = require('../controllers/uploadCtrl')
const filesCtrl = require('../controllers/filesCtrl')
const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/:id/upload_images', uploadImages.upload.array('files', 8), auth, filesCtrl.MultipleFileUpload)
router.get("/:id/upload_images", filesCtrl.getAllMultipleFiles);

module.exports = router

// const express = require("express");
// const { upload } = require("../helper/fileHelper");
// const {
//   singleFileUpload,
//   MultipleFileUpload,
//   getAllSingelFiles,
//   getAllMultipleFiles,
// } = require("../controllers/fileUploaderController");
// const router = express.Router();

// router.post("/singleFile", upload.single("file"), singleFileUpload);
// router.post("/MultipleFile", upload.array("files"), MultipleFileUpload);

// router.get("/allSingleFiles", getAllSingelFiles);
// router.get("/allMultipleFiles", getAllMultipleFiles);

// module.exports = {
//   routes: router,
// };