import Product from "../models/productSchema.js"
import User from "../models/userScheme.js"

const addToCart = async(req,res)=>{

    try{

    const userId= req.params.id
    const productId =req.body.productId
    
    const product= await Product.findById(productId)
    const user= await User.findById(userId)
    

    console.log(user)
    console.log(product)

    if(!product){
        return res.status(401).json({message:'Product Not Found'})
    }

    
    if(!user){
        return res.status(401).json({message:"User Not Found"})
    }

    let cart = user.cart || [];

    const existingProduct = cart.find((items)=>items.productId.toString() === productId )
    // 


    if(existingProduct){
        existingProduct.quantity +=1;
    }else{
        cart.push({productId:product._id,quantity:1})
    }

    user.cart = cart;
    await user.save();

    res.status(201).json({message:"Product added to the cart ",cart})
    }
    catch(error){
        res.status(401).json({error:error.message})
    }

}

export default addToCart