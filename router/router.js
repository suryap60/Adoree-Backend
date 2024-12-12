import express from 'express'
import {login, signUp  } from '../controllers/userController.js'
import { getProductDetails, getProducts, postProducts } from '../controllers/productController.js'
import { checkAuth } from '../middleware/checkauth.js'
import addToCart from '../controllers/cartController.js'

const router = express.Router()

router.post('/register',signUp)
router.post('/login',login)
router.post('/products',postProducts)
router.get('/get',checkAuth,getProducts)
router.get('/getProducts/:id',getProductDetails)
router.post('/addToCart/:id',addToCart)

export default router