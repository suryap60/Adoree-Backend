import express from 'express'
import {login, signUp  } from '../controllers/userController.js'
import { getProducts, postProducts } from '../controllers/productController.js'

const router = express.Router()

router.post('/register',signUp)
router.post('/login',login)
router.post('/products',postProducts)
router.get('/get',getProducts)

export default router