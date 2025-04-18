import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


export const isAuthenticated=(req, res, next)=>{
  console.log("authentication called")
    const {token} = req.cookies;
    console.log("token1", token);
    if(!token){
        console.log("no token found")
        res.status(404).json({
            success:false,
            message:"please login first",
        })
    }

  console.log("token2", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
        req.user = User.findById(decoded._id);
        next();
    
}