import Product from "../models/productSchema.js"



const postProducts = async (req,res )=>{

    try{
        const {name , size , price ,category,quantity } = req.body;

        const existingProducts = await Product.find({name})
        // console.log(existingProducts)
        if(existingProducts < 0){
            res.status(201).json({message:'Product already added'})
        }

        const newProduct = new Product ({name , size , price,category, quantity})

        await newProduct.save()

        res.status(201).json({message:'Successfully Added',products:newProduct})
    }catch(error){
        res.status(401).json({error:'error in server side' + error.message})
    }
}

const getProducts = async (req,res)=>{


    try{
        
        const products = await Product.find()
        // console.log(products)
        

    if(products.length === 0 ){
        return res.status(404).json({message:"No Products Found"})
    }

    res.status(201).json({message:'successfully get all products',product:products})
    }
    catch(error){
        res.status(401).json({error:'error in server'+error.message})
    }
} 

const getProductDetails = async(req,res)=>{

    try{
    
    const productId = req.params.id
    // const userName =req.query.name

    const products = await Product.findById({_id:productId})
    // console.log(products)

    if(!products){
        return res.status(401).json({message:"No Product Found"})
    }

    res.status(201).json({message:'successfully get products',product:products})
    


    }catch(error){
        res.status(401).json({error:error.message})
    }


}


const getProductsCategory = async (req,res)=>{

    try{
        const category = req.query.category

    const products = await Product.find({category})

    if(products.length < 0){
        res.status(501).json({message:"The Category doesn't exist"})
    }

    res.status(201).json({message:"Successfully get product",products})
    }
    catch(error){
        res.status(401).json({error:error.message})
    }

 }

export {getProducts,postProducts,getProductDetails,getProductsCategory}