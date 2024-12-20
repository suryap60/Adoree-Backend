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


const getCartItems = async(req,res)=>{

   try{
    const userId = req.params.id;

    const user = await User.findById(userId)

    if(!user){
        return res.status(401).json({message:"User Not Found"})
    }

    const cartItems = user.cart

    if(!cartItems || cartItems.length === 0){
        return res.status(401).json({message:"Cart is empty"})
    }

    const result = await User.aggregate([
        { $match: { _id: userId } },  // Match the user by ID
        { $unwind: "$cart" },  // Unwind the cart array to process each item
        {
           $group: {
              _id: null,  // Group all items into one result
              totalQuantity: { $sum: "$cart.quantity" },  // Sum the quantities
              totalPrice: { $sum: { $multiply: ["$cart.price", "$cart.quantity"] } }  // Calculate total price
           }
        }
     ]);

     // If the aggregation result is not empty, extract the totals
     const totalQuantity = result.length > 0 ? result[0].totalQuantity : 0;
     const totalPrice = result.length > 0 ? result[0].totalPrice : 0;

    return res.status(201).json({message:"Successfully get cartItems",cart:cartItems,totalQuantity: totalQuantity,totalPrice: totalPrice})
   }
   catch(error){
    return res.status(401).json({error:error.message})
   }
}


export  {addToCart,getCartItems}