import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },  
    quantity: { 
        type: Number, 
        default: 1, 
        required: true 
    } ,
    price: {
        type:Number,
        required:true

    }
});


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

    },
    cart:{
        type:[cartItemSchema],
        default:[],
    },
    wishlist:[{
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product', 
            },
          },
        ],

    purchase:[{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', 
        },
        quantity:{
            type:Number,
        },
        price:{
            type:Number,
            required:true,
        }
      },
    ],
    
    
})
const User =mongoose.model('user',userSchema)
export default User