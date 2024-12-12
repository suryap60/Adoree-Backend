
import jwt from 'jsonwebtoken'
const checkAuth = (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        // console.log(token)

        if(!token){
            return res.status(401).json({message:"Access denied"})

        }

        const tokenValid = jwt.verify(token,process.env.SECRETE_CODE)

        if(!tokenValid){
            return res.status(500).json({message:'You are not Authorized'})

        }

        next()


    }catch(error){
        res.status(401).json({error:error.message})
    }
}

export { checkAuth }
