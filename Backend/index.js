import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './data/db.js';
import router from './router/route.js';
const app = express();
dotenv.config();


connectDB();

app.use(express.json());
app.use('/api/v1/', router);

app.get('/',(req, res)=>{
    res.send("hello from server");
})

app.listen(process.env.PORT, ()=>{
    console.log(`server started on ${process.env.PORT}`);
})