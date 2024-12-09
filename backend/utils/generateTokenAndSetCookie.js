


import jwt from 'jsonwebtoken'




export const generateTokenAndSetCookie=(res,userId)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
        });

       res.cookie("token",token,{
        httpOnly:true,
        maxAge: 24*60*60*1000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV==="production" //only work on https
        
       })
       return token
}