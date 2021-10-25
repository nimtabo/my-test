const router = require('express').Router()
// const router = require("express").Router({ mergeParams: true });
const shopCtrl = require('../controllers/shopCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post('/create', auth, shopCtrl.createShop)
router.get('/shops', auth, shopCtrl.getAllShops)
router.get('/shops/:id', auth, shopCtrl.getShop)
router.patch('/shops/:id', auth, shopCtrl.updateShop)
router.delete('/shops/:id', auth, shopCtrl.deleteShop)

// SHOP PRODUCTS
router.post('/shops/:shopId/products', auth, shopCtrl.addProduct)
router.get('/shops/:shopId/products/available', shopCtrl.getAvailableProducts)
router.get('/shops/:shopId/products/soldout', shopCtrl.getSoldOutProducts)
router.get('/shops/:shopId/products/onhold', shopCtrl.getOnHoldProducts)
router.get('/shops/:shopId/products/archived', shopCtrl.getArchivedProducts)
router.get('/shops/:shopId/products/:productId', auth, shopCtrl.getProduct)
router.patch('/shops/:shopId/products/:productId', auth, shopCtrl.updateProduct)
router.patch('/shops/:shopId/products/:productId/available', auth, shopCtrl.updateProductAvailability)
router.patch('/shops/:shopId/products/:productId/archive', auth, shopCtrl.moveProductToArchive)
router.delete('/shops/:shopId/products/:productId', auth, shopCtrl.deleteProduct)


// ********* ADMIN ROUTES *******
router.get('/:userId/shops', auth, authAdmin, shopCtrl.adminGetAllShops)
router.get('/:userId/shops/:shopId', auth, shopCtrl.adminGetShop)
router.patch('/:userId/shops/:shopId', auth, shopCtrl.adminUpdateShop)
router.delete('/:userId/shops/:shopId', auth, shopCtrl.deleteShop)

router.get('/:userId/shops/:shopId/products', auth, authAdmin, shopCtrl.adminGetAllShopProducts)
router.get('/:userId/shops/:shopId/products/:productId', auth, shopCtrl.adminGetProduct)
router.patch('/:userId/shops/:shopId/products/:productId', auth, shopCtrl.adminUpdateProduct)
router.delete('/:userId/shops/:shopId/products/:productId', auth, shopCtrl.adminDeleteProduct)


module.exports = router