const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')



router.get('/list', productCtrl.getAllProducts)
router.get('/list/:id', productCtrl.getProduct)
router.get('/search/:make/:model/:year/:part', productCtrl.searchProduct)
// router.get('/search/:make/:model/:year/:engine/:category/:part', productCtrl.searchProduct)

// Admin Only Routes
// *****************


module.exports = router