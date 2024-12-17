import express from 'express'
import {login, signUp  } from '../controllers/userController.js'
import { getProductDetails, getProducts, getProductsCategory, postProducts } from '../controllers/productController.js'
import { checkAuth } from '../middleware/checkauth.js'
import addToCart from '../controllers/cartController.js'
import wishList from '../controllers/wishListController.js'
import purchase from '../controllers/purchaseConroller.js'

const router = express.Router()

router.post('/register',signUp)
router.post('/login',login)
router.post('/products',postProducts)
router.get('/get',checkAuth,getProducts)
router.get('/productsCategory',getProductsCategory)
router.get('/getProducts/:id',getProductDetails)
router.post('/addToCart/:id',addToCart)
router.post('/wishList/:id',wishList)
router.post('/:id/purchase',purchase)

export default router