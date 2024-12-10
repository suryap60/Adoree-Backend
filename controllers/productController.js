import Product from "../models/productSchema.js"


const postProducts = async (req,res )=>{

    try{
        const {name , size , price ,quantity } = req.body;

        const existingProducts = await Product.find({name})
        console.log(existingProducts)
        if(existingProducts.length < 0){
            res.status(201).json({message:'Product already added'})
        }

        const newProduct = new Product ({name , size , price, quantity})

        await newProduct.save()

        res.status(201).json({message:'Successfully Added',products:newProduct})
    }catch(error){
        res.status(401).json({error:'error in server side' + error.message})
    }
}

const getProducts = async (req,res)=>{


    try{
        const products = await Product.find()
        console.log(products)

    if(products.length === 0 ){
        return res.status(401).json({message:"No Products Found"})
    }

    res.status(201).json({message:'successfully get all products',product:products})
    }
    catch(error){
        res.status(401).json({error:'error in server'+error.message})
    }
} 

export {getProducts,postProducts}