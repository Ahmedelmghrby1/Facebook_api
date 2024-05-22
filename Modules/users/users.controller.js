import { DataTypes } from "sequelize";
import { sequelize } from "../../Database/dbConnection.js";
import bcrypt from "bcrypt";
let userModel = sequelize.define("user", {
  username: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(100),
  },
  password: {
    type: DataTypes.STRING(100),
  },
});
// registerUser
const registerUser = async (req, res) => {
  try {
    const { username,email,password } = req.body;
    if(!username||!email||!password){
        return res.status(400).json({message:" All fields required"})
    }

    // Check if the email is already registered
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await userModel.create(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// login
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
      }
  
      // Check if the email is already registered
      const user = await userModel.findOne({
        where: { email },
          });
  
      if (!user) {
        return res.status(400).json({ message: "incorrect email or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }
  const data ={
    id:user.id,
    username:user.username,
    email:user.email,
  } 
      return res.status(200).json({ message: "Login successful", user:data});
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
//   logout
// const logout = async (req, res) => {
    
// }





export { userModel, registerUser, login };
