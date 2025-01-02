import express from 'express'
import {login, signUp  } from '../controllers/userController.js'
import { getProductDetails, getProducts, getProductsCategory, postProducts } from '../controllers/productController.js'
import { checkAdmin, checkAuth } from '../middleware/checkauth.js'
import  { addToCart, getCartItems, viewTotalCartItems } from '../controllers/cartController.js'
import wishList from '../controllers/wishListController.js'
import {purchase, viewPurchaseProducts} from '../controllers/purchaseConroller.js'
import { adminLogin, signUpAdmin } from '../controllers/adminController.js'
import { viewSpecificUser, viewUsers } from '../controllers/adminUserController.js'
import { createProduct, deleteProduct, updateProduct, viewProductsByCategory, viewSpecificProduct } from '../controllers/adminProductController.js'

const router = express.Router()

// User
router.post('/register',signUp)
router.post('/login',login)
router.post('/products',postProducts)
router.get('/get',checkAuth,getProducts)
router.get('/productsCategory',getProductsCategory)
router.get('/getProducts/:id',getProductDetails)
router.post('/addToCart/:id',addToCart)
router.post('/wishList/:id',wishList)
router.post('/:id/purchase',purchase)
router.get('/cartItems/:id',getCartItems)
// admin
router.post('/adminSignUp',signUpAdmin)
router.post('/adminLogin',adminLogin)
router.get('/viewUsers',checkAdmin,viewUsers)
router.get('/viewUser/:id',checkAdmin,viewSpecificUser)
router.get('/viewProductsByCategory',checkAdmin,viewProductsByCategory)
router.get('/viewSpecificProduct/:id',checkAdmin,viewSpecificProduct)
router.post('/createProduct',checkAdmin,createProduct)
router.delete('/deleteProduct',checkAdmin,deleteProduct)
router.put('/updateProduct/:id',checkAdmin,updateProduct)
router.get('/viewTotalCartItems/:id',checkAdmin,viewTotalCartItems)


export default router