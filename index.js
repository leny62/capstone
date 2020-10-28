import './src/models/db';
import { set } from 'mongoose';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './src/routes/users';
import blogsRoutes from './src/routes/blogs';
import inquiryRoutes from './src/routes/inquiries';


set('useNewUrlParser', true);
set('useUnifiedTopology', true);

const app = express();

dotenv.config();


app.use(json());
app.use(urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send("Welcome to my app").status(200)
})
app.use(`${process.env.API_VERSION}/user`,usersRouter)
app.use(`${process.env.API_VERSION}/blogs`,blogsRoutes);
app.use(`${process.env.API_VERSION}/inquiries`,inquiryRoutes);

const port = process.env.PORT;

app.listen(port,()=>{ 
    console.log("App connected "+port);
})