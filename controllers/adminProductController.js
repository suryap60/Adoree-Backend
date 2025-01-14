import Product from "../models/productSchema.js"


const viewProductsByCategory = async(req,res)=>{
    try{
        
        const category = req.query.category
        const product = await Product.find({category})

        if(product.length <0){
            return res.status(401).json({message:"Product Not Found"})
        }

        return res.status(201).json({message:"Products Found Succcessfully",product})
    }
    catch(error){
        res.status(401).json({error:error.message})
    }
}

const viewSpecificProduct = async(req,res)=>{

   try{
   
    const productId = req.params.id
    const product = await Product.findById({_id:productId})

    if(!product){
        return res.status(401).json({message:"Product Not Found"})
    }

    return res.status(201).json({message:"Product Found Successfully",product})
   }
   catch(error){
    return res.status(401).json({error:error.message})
   }

}

const createProduct = async(req,res)=>{
    try{
         

        const {name ,size ,price ,category ,quantity}  = req.body

        const existingProduct = await Product.find({name})
        
        if(existingProduct.length <0){
            return res.status(401).json({message:"Product already exist"})
        }

        const newProduct = new Product({name,size,price,category,quantity})

        await newProduct.save()
        return res.status(201).json({message:"New Product added successfully",newProduct})



    }
    catch(error){
        return res.status(401).json({error:error.message})
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const productId = req.params.id;
        // console.log("productid",productId)
        const product = await Product.findOneAndDelete({_id:productId})
        // console.log(product)
        if(!product){ 
            return res.status(401).json({message:"Product Not Found"}, )
        }

        return res.status(201).json({message:"Product Deleted Successfully"})

    }
    catch(error){
        return res.status(401).json({error:error.message})
    }

}

const updateProduct = async(req,res)=>{
    try{
   
        const productId = req.params.id
        const updateData = req.body
        const product = await Product.findByIdAndUpdate({_id:productId},updateData,{new:true})

        if(!product){
            return res.status(404).json({message:"Product Not Found"})
            
        }


        return res.status(200).json({message:"Product Updated Successfully",updatedProduct: product})

    }
    catch(error){
        return res.status(401).json({error:error.message})
    }

}

export {viewProductsByCategory,viewSpecificProduct,createProduct,deleteProduct,updateProduct}