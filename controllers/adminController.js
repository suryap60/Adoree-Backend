import User from "../models/userScheme.js";
import { generateHashedPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";


const validatePassword =(password)=>{
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
  }
  
  const validateEmail =(email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  


const signUpAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!validatePassword(password)) {
        return res
        .status(401)
        .json({
          message: "Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character."
        });
      }
  
      if(!validateEmail(email)){
        return res
        .status(401)
        .json({
          message: "Enter a validate email"
        });
      }
  
  
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res
        .status(500)
        .json({ message: "email is already existing" });
      
      } else {
        const hashedPassword = await generateHashedPassword(password);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
  
        res
          .status(201)
          .json({ message: "User created successfully!",  user: newUser });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred: " + error.message });
    }
  };


  const adminLogin = async(req,res)=>{
     
    try{
      const {email,password} = req.body

      const admin =  await User.findOne({email})


      if(email === "admin@gmail.com" && password === "admin@098"){
        const accessToken = generateAccessToken(admin.id);
        return res.status(201).json({message:"Admin Login Successfully",admindata:admin,accessToken})
      }

      return res.status(401).json({message:"Incorrect emailId or Password"})

    }catch(error){
      return res.status(500).json({error:error.message})
    }
  }

  export {signUpAdmin,adminLogin}