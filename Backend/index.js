import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './data/db.js';
import router from './router/route.js';

import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(express.json());


app.use(cors({
    origin: 'https://ai-interview-app-ruddy.vercel.app',
    credentials: true,
}));

app.use(cookieParser());

app.use('/api/v1/', router);

app.get('/',(req, res)=>{
    res.send("hello from server");
})

app.listen(PORT, ()=>{
    console.log(`server started on ${PORT}`);
})