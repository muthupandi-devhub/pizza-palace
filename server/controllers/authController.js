const User = require("../models/User.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const registerUser=async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        // Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user = await User.create(
            {
                username,
                email,
                password: hashedPassword
            }
        );
        res.status(201).json({
            message:"User registered successfully",
        }) 
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    };
}

const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"})
        }
        const token=jwt.sign({id: user._id},"secretkey",{expiresIn:"10d"});
       res.status(200).json({
  message:"Login successful",
  token,
  role:user.role,
  username:user.username
});
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={registerUser, loginUser};