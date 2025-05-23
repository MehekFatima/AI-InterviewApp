import jwt from 'jsonwebtoken'

export const sendCookie = (user, res, message, statusCode=200, userName, userId) =>{
     const token = jwt.sign({_id:user._id}, process.env.JWT_SECRETKEY);
     
     res.status(statusCode).cookie("token", token,{
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false: true,
     }).json({
        sucess:true,
        userName,
        userId,
        message,
     })
}