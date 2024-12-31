import jwt from 'jsonwebtoken'

const generateAccessToken =(userId)=>{
    return jwt.sign({_id: userId},process.env.SECRETE_CODE)
};

const verifyToken = (token)=>{
    return jwt.verify(token,process.env.SECRETE_CODE)
}

export {generateAccessToken,verifyToken}