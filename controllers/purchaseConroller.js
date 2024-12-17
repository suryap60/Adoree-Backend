import User from "../models/userScheme.js"
import addToCart from "./cartController.js"

const purchase = async(req,res)=>{

    try{
        const userId = req.params.id

        const user = await User.findById(userId)

        const cart = user.cart
        console.log(cart)

        if(!user){
            res.status(401).json({message:"Please SignUp"})
        }

        let purchase = user.purchase || [];

        if(!cart){
            res.status(401).json({message:"Cart is already empty"})
        }

        purchase.push(...cart)
        cart.splice(0, cart.length);
        user.purchase = purchase;
        await user.save();
        res.status(201).json({message:"Products purchased successfully",purchase})
    }
    catch(error){
        res.status(401).json({error:error.message})
    }


}
export default purchase