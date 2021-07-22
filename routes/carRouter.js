const router = require('express').Router()
// const router = require("express").Router({ mergeParams: true });
const carCtrl = require('../controllers/carCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// **** ADMIN ROUTES******
router.post('/add', auth, authAdmin, carCtrl.addCar)
router.get('/list', auth, authAdmin, carCtrl.getAllCars)
router.get('/list/:id', auth, authAdmin, carCtrl.getCar)
router.patch('/update/:id', auth, authAdmin, carCtrl.updatCar)
router.get('/delete/:id', auth, authAdmin, carCtrl.deleteCar)

// *********
router.get('/makes', carCtrl.getMakes)
router.post('/:make', carCtrl.getModels)
router.post('/:make/:model', carCtrl.getYears)
router.post('/:make/:model/:year', carCtrl.getEngine)
router.post('/:make/:model/:year/:engine', carCtrl.getCategory)
router.post('/:make/:model/:year/:engine/:category', carCtrl.getParts)


module.exports = router