import jwt from 'jsonwebtoken'

const generateAccessToken =(userId)=>{
    return jwt.sign({_id: userId},process.env.SECRETE_CODE)
};

export {generateAccessToken}