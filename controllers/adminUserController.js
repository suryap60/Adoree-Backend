import User from "../models/userScheme.js"


const viewUsers = async(req,res)=>{

    try{
       
        const users = await User.find()

        if(users.length === 0 ){
            return res.status(404).json({message:"User Not Found"})
        }

        return res.status(200).json({ message: "Users fetched successfully", users });

    }
    catch(error){
        return res.status(500).json({error:error.message})
    }

}

const viewSpecificUser = async(req,res)=>{

    try{
        
     const userId = req.params.id

     const user = await User.findById(userId)
     console.log(user)



    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    
    return res.status(200).json({message:"Found User Successfully",user})

    }
    catch(error){
        return res.status(500).json({error:error.message})
    }

}   

export {viewUsers,viewSpecificUser}