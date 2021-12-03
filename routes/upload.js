const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadImages = require('../middleware/uploadImages')
const uploadCtrl = require('../controllers/uploadCtrl')
const filesCtrl = require('../controllers/filesCtrl')
const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/upload_images', uploadImages.array('profileImages', 8), filesCtrl.uploadImages)

module.exports = router