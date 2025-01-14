import mongoose from "mongoose"
import User from "../models/userScheme.js"


const purchase = async(req,res)=>{

    try{
        const userId = req.params.id

        const user = await User.findById({_id:userId})

        const cart = user.cart
        console.log(cart)

        if(!user){
            return res.status(401).json({message:"Please SignUp"})
        }

        let purchase = user.purchase || [];

        if(!cart || cart.length ===0){
            return res.status(401).json({message:"Cart is already empty"})
        }

        purchase.push(...cart)
        cart.splice(0, cart.length);
        user.purchase = purchase;
        await user.save();
        return res.status(201).json({message:"Products purchased successfully",purchase})
    }
    catch(error){
        return res.status(401).json({error:error.message})
    }


}

const viewPurchaseProducts = async(req,res)=>{

   try
   {

    const userId = req.params.id

    const user = await User.findById({_id:userId})

    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    let purchaceItems = user.purchase

    if(!purchaceItems || purchaceItems.length === 0){
        return res.status(404).json({message:"No Items Purchased"})
    }
    
    const result = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {$unwind:"$purchase"},
        {
            $group:{
                _id: "$_id", // Group by the user ID,
                totalQuantity: { $sum: "$purchase.quantity" }, 
                totalPrice: { $sum: "$purchase.price" },    
            },
        }

        
    ])
    console.log("Aggregation Result:", result);
    return res.status(200).json({message:"Find all purchased Products",result})
    
   }
   catch(error){
    res.status(500).json({error:error.message})
   }
}
export  {purchase,viewPurchaseProducts}