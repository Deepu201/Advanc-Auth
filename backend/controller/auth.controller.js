
import bcrypt from 'bcryptjs'; // Corrected the import statement
import crypto from 'crypto'
// import {generateVerificationCode} from '../utils/generateVerificationCode.js'


import {sendPasswordResetEmail,sendResetSuccessEmail} from '../mailtrap/emails.js'

import { sendVerificationEmail } from '../mailtrap/emails.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendWelcomeEmail } from '../mailtrap/emails.js';
import { User } from '../model/user.model.js';


const  signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Input validation
      if (!name || !email || !password ) {
        return res.status(400).json({
          message: "Please fill in all fields",
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  

      const verificationToken= Math.floor(10000+Math.random()*900000).toString()
      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt:Date.now() +24*60*60*1000

      });
  
      // Save the new user
      await user.save();

      generateTokenAndSetCookie(res,user._id)



        await sendVerificationEmail(user.email,verificationToken)
  
      res.status(201).json({
        success:true,
        message: "User registered successfully",
        user:{
          ...user._doc,
          password: undefined
        }
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const verifyEmail=async(req,res)=>{
    const {code}=req.body
    try{
      const user=await User.findOne({
        verificationToken:code,
        verificationTokenExpiresAt:{$gt:Date.now()}

      })

      if(!user){
        return res.status(400).json({
          message: "Invalid verification token",
          });
      }
      user.isVerified=true
      user.verificationToken=undefined
      user.verificationTokenExpiresAt=undefined
      await user.save()

      await sendWelcomeEmail(user.email,user.name)
      res.status(200).json({
        success:true,
        message: "Email verified successfully",
        user:{
          ...user._doc,
          password:undefined
        }
      })


    }catch(error){
console.log('error in verfyEmail',error)
    }

  }

  const login = async (req, res) => {
    console.log('Received login request:', req.body);
  
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      generateTokenAndSetCookie(res,user._id)

      user.lastLogin=  new Date()
        await user.save()
        res.status(200).json({
          success: true,
          message: "Logged in successfully",
          user:{
            ...user._doc,
            password:undefined
          }

          })


  
      // localStorage.setItem('token', token);
  
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const logout=async(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({ message: "User logged out successfully" });
    

  }
  
  



  const forgotPassword=async(req,res)=>{
    const {email}=req.body
    try{
      const user=await User.findOne({email})
      if(!user){
        return res.status(400).json({message:"Email not found"})
        }
// generate reset  token
const resetToken=crypto.randomBytes(32).toString('hex')
const ressetTokenExpireesAt=Date.now()+1*60*60*1000//1 hour
user.resetPasswordToken=resetToken
user.resetPasswordExpiresAt=ressetTokenExpireesAt

await user.save()

await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
res.status(200).json({message:"Email sent to your email address"})


    }catch(error){
      console.error(error)
    }


  }

const resetPassword=async(req,res)=>{

const {token}=req.params
const {password}=req.body


try{
const user =await User.findOne({
  resetPasswordToken:token,
  resetPasswordExpiresAt:{$gt:Date.now()}
  })
  if(!user){
    return res.status(400).json({message:"Invalid or expired token"})}
    // hash password
    const hashedPassword=await bcrypt.hash(password,12)
    user.password=hashedPassword
    user.resetPasswordToken=null
    user.resetPasswordExpiresAt=null
    await user.save()
    await sendResetSuccessEmail(user.email)
    res.status(200).json({message:"Password updated successfully"})



}catch(error){
  console.error(error)
}
}


const checkAuth=async(req,res)=>{

try{
  const user= await User.findById(
    req.userId
  ).select("-password")
  if(!user){
    return res.status(400).json({message:"User not found"})}
    res.status(200).json({user})
    
}catch(error){
  console.error(error)
}
}

  export {signup,login,logout,forgotPassword,resetPassword,checkAuth}