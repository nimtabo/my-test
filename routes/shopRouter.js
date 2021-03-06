const router = require('express').Router()
// const router = require("express").Router({ mergeParams: true });
const shopCtrl = require('../controllers/shopCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const upload = require('../middleware/upload')
const uploadImage = require('../middleware/uploadImage')
const updateImage = require('../middleware/updateImage')


router.post('/create', auth, shopCtrl.createShop)
router.get('/shops', auth, shopCtrl.getAllShops)
router.get('/shops/:id', auth, shopCtrl.getShop)
router.patch('/shops/:id', auth, shopCtrl.updateShop)
router.delete('/shops/:id', auth, shopCtrl.deleteShop)

// SHOP PRODUCTS
// router.post('/shops/:shopId/products', upload.array('multiple_image', 6), auth, shopCtrl.addProduct)
router.post('/shops/:shopId/products', uploadImage, auth, shopCtrl.addProduct)
router.get('/shops/:shopId/products/available', shopCtrl.getAvailableProducts)
router.get('/shops/:shopId/products/soldout', shopCtrl.getSoldOutProducts)
router.get('/shops/:shopId/products/onhold', shopCtrl.getOnHoldProducts)
router.get('/shops/:shopId/products/archive', shopCtrl.getArchivedProducts)
router.post('/shops/:shopId/products/filter', shopCtrl.getFilterProducts)
router.get('/shops/:shopId/products/:productId', auth, shopCtrl.getProduct)
// router.patch('/shops/:shopId/products/:productId', auth, upload.array('multiple_image', 1), shopCtrl.updateProduct)
router.patch('/shops/:shopId/products/:productId/image', auth, updateImage, shopCtrl.updateProductWithImage)
router.patch('/shops/:shopId/products/:productId', auth, shopCtrl.updateProduct)
router.patch('/shops/:shopId/products/:productId/delete_image', upload.array('multiple_image', 1), auth, shopCtrl.deleteProductImage)
router.patch('/shops/:shopId/products/update/bulk_action', auth, shopCtrl.updateProductAvailability)
router.patch('/shops/:shopId/products/:productId/archive', auth, shopCtrl.moveProductToArchive)
router.delete('/shops/:shopId/products/:productId', auth, shopCtrl.deleteProduct)


// ********* ADMIN ROUTES *******
router.get('/list', auth, authAdmin, shopCtrl.adminGetAllShops)
router.get('/:userId/shops/:shopId', auth, authAdmin, shopCtrl.adminGetShop)
router.patch('/:userId/shops/:shopId', auth, authAdmin, shopCtrl.adminUpdateShop)
router.delete('/:userId/shops/:shopId', auth, authAdmin, shopCtrl.deleteShop)

router.get('/products', auth, authAdmin, shopCtrl.adminGetAllProducts)
router.get('/:userId/shops/:shopId/products', auth, authAdmin, shopCtrl.adminGetAllShopProducts)
router.get('/:userId/shops/:shopId/products/:productId', auth, authAdmin, shopCtrl.adminGetProduct)
router.patch('/:userId/shops/:shopId/products/:productId', auth, authAdmin, shopCtrl.adminUpdateProduct)
router.delete('/:userId/shops/:shopId/products/:productId', auth, authAdmin, shopCtrl.adminDeleteProduct)


module.exports = router