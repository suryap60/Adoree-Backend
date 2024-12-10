import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        length: 8,
        type:String,
        trim:true,
        required:true,
        numbers:true,
        symbol:true,
        // uppercase:false,
        excludeSimilarCharacters: true,
        strict: true,

    }
})
const User =mongoose.model('user',userSchema)
export default User