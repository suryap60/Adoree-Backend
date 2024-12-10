import User from "../models/userScheme.js";
import { generateHashedPassword, comparePassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";

const validatePassword =(password)=>{
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return passwordPattern.test(password);
}

const validateEmail =(email)=>{
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!validatePassword(password)) {
      return res
      .status(400)
      .json({
        message: "Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character."
      });
    }

    if(!validateEmail(email)){
      return res
      .status(400)
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
      // console.log(hashed)
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully!", user: newUser });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    const validPassword = await comparePassword(
      password,
      existingUser.password
    );
    // console.log(validPassword)

    // console.log(existingUser.id);

    // if (!existingUser) {
    //   res.status(500).json({ message: "Please SignUp" });
    // }

    // console.log(validPassword);                

    if (!existingUser || !validPassword) {
      return res.status(500).json({ message: "Invalid Password or Email" });
    }
    
    const accessToken = generateAccessToken(existingUser.id);
    
    res
      .status(201)
      .json({ message: "User Login successfully!", user: existingUser, accessToken });
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

export { signUp, login };
