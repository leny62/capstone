import { set, connect } from 'mongoose';
set('useNewUrlParser', true);
set('useUnifiedTopology', true);

import express from 'express';
import { json, urlencoded } from 'body-parser';
import usersRouter from './src/routes/users';
import blogsRoutes from './src/routes/blogs';
import inquiryRoutes from './src/routes/inquiries';

const app = express();

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

export default app;