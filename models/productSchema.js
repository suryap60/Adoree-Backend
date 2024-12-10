import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required :true,
        
    },
    size:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
        trim:true,
        required:true
    }
})

const Product = mongoose.model('product',productSchema)

export default Product