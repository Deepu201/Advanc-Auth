

import jwt from 'jsonwebtoken'


export const verifyToken=async(req,res,next)=>{
const token=req.cookies.token
if(!token)
    return res.status(401).json({msg:'No token, authorization denied'})
try{
    const decoded=jwt.verify(token,process.env.
        JWT_SECRET)
    if(!decoded){
        return res.status(401).json({msg:'Invalid token, authorization denied'})
    }
    req.userId=decoded.userId
    next()



}catch(error){
    return res.status(500).json({msg:'Server error'})

}
}