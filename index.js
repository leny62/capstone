import app from './app';
// import express from 'express';
// import mongoose from 'mongoose';
// import config from './src/config/config';
// import bodyParser from 'body-parser';
// import usersRouter from './src/routes/users';
// import blogsRoutes from './src/routes/blogs';
// import commentsRoutes from './src/routes/comments';
// import inquiryRoutes from './src/routes/inquiries';

// const app = express();

// const CONNECTION_URL = config.CONNECTION_URL;
// mongoose.connect(`${CONNECTION_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true   
const port = process.env.PORT;
app.listen(port, () => { 
    console.log("App connected on port " + port);
});     