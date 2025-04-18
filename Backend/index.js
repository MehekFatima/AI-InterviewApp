import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './data/db.js';
import router from './router/route.js';

import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();



connectDB();

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use(cookieParser());

app.use('/api/v1/', router);

app.get('/',(req, res)=>{
    res.send("hello from server");
})

app.listen(process.env.PORT, ()=>{
    console.log(`server started on ${process.env.PORT}`);
})