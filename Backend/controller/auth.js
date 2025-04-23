import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";

export const register = async(req, res, next)=>{

    console.log("req coming to register");
   try {
      const {name, email, password} = req.body;
      let user = await User.findOne({email});
      if(user)
        { console.log("user already exist")
         return res.status(400).json({success:false, message: "user already exist"});
        }
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({name, email, password:hashedPassword});
      res.status(200).json({
        success:true,
        message: "user created successfully",
        user: {
            name: user.name,
            email: user.email,
          },
      })
      

   } catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:"server error",
    })
   }
}

export const login = async(req, res)=>{
    console.log("req to login");
    try {
        const {email, password} = req.body;

       

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
          }

      const user = await User.findOne({email}).select("+password");
      if(!user)
      {
        res.status(400).json({sucess:false, message: "user doesn't exist"});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch)
      {
        res.status(400).json({sucess:false, message: "invalid password"});
      }

      sendCookie(user, res , `Welcome back ${user.name}`, 200, user.name, user._id, user.interviewId);

    } catch (error) {
        console.log(error);
        res.status(500).json({sucess:false, message: "internal server error"});
    }
}