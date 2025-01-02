import User from "../models/userScheme.js"


const purchase = async(req,res)=>{

    try{
        const userId = req.params.id

        const user = await User.findById(userId)

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
    const purchase = User.purchase
    const purchaseItem = await User.find({ purchase})
    console.log(purchaseItem)
    return res.status(200).json({message:"Find all purchase Products",purchaseItem})
    
   }
   catch(error){
    res.status(500).json({error:error.message})
   }
}
export  {purchase,viewPurchaseProducts}