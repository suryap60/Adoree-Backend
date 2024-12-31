
import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/jwt.js';
import User from '../models/userScheme.js';
const checkAuth = (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        console.log(token)
       

        if(!token){
            return res.status(401).json({message:"Access denied"})

        }

        const tokenValid = verifyToken(token)

        if(!tokenValid){
            return res.status(500).json({message:'You are not Authorized'})

        }
        
        next()


    }catch(error){
        res.status(401).json({error:error.message})
    }
}


const checkAdmin = async ( req ,res, next)=>{
    try{
        const adminEmail = req.body.email;
        
        
        const token = req.headers.authorizations

        const admin = await User.findOne({email:"admin@gmail.com"})
        


        if(!token){
            return res.status(401).json({message:"Admin Access denied"})
        }

        const tokenValid = verifyToken(token)

        if(!tokenValid ){
            return res.status(403).json({message:'You are not Authorized'})

        }
        if(adminEmail !== admin.email){
            return res.status(403).json({message:'Admin Not Found'})
        }
        
        next()
    }
    catch(error){
        return res.status(401).json({error:error.message})
    }
}


export { checkAuth , checkAdmin }
