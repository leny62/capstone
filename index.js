import './src/models/db';
import { set, connect } from 'mongoose';
set('useNewUrlParser', true);
set('useUnifiedTopology', true);

import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './src/routes/users';
import blogsRoutes from './src/routes/blogs';
import inquiryRoutes from './src/routes/inquiries';

const app = express();

dotenv.config();

connect(`${process.env.CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("App connected to DB...");
})
.catch((error)=>{
    console.log("App failed to connect to DB.. error "+error);
})

app.use(json());
app.use(urlencoded({extended: true}))

app.use(usersRouter)
app.use(blogsRoutes)

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