import mongoose from 'mongoose';


export const connectDB = () =>{
    mongoose.connect(process.env.DATABASE_URL, {
        dbName: "AI_INTERVIEWAPP_BACKEND",
    })
    .then((c)=>{
        console.log("database connected successfully")
    })
    .catch((e)=>{
        console.log(e);
    })
}


