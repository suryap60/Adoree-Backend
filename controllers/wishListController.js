import Product from "../models/productSchema.js"
import User from "../models/userScheme.js"

const wishList = async(req,res)=>{

    try{
        
    const userId = req.params.id
    const productId = req.body.productId 


    // console.log(productId)
    // console.log(userId)


    const product= await Product.findById(productId)
    const user = await User.findById(userId)

    if(!user || !product){
        return res.status(401).json({message:"UserID or ProductID  Not Found"})
    }
    
    if (!user.wishlist) {
        user.wishlist = [];
      }

    

    let existingProduct = user.wishlist.find(
        (items)=>items.productId.toString() === productId)

    if(existingProduct){
        
        return res.status(401).json({message:'Product already added to wishlist'})
        
    }else{
        user.wishlist.push({ productId });
        
        await user.save()
        return res.status(201).json({message:'Product Successfully added to wishList ',wishlist:user.wishlist})
        
    }
    
   
    
    
    

    }catch(error){
        return res.status(501).json({error:error.message})
    }


}

export default wishList