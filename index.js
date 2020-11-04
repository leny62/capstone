import express from 'express';
import mongoose from 'mongoose';
import config from './src/config/config';
import bodyParser from 'body-parser';
import usersRouter from './src/routes/users';
import blogsRoutes from './src/routes/blogs';
import commentsRoutes from './src/routes/comments';
import inquiryRoutes from './src/routes/inquiries';

const app = express();


const CONNECTION_URL = config.CONNECTION_URL;
mongoose.connect(`${CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to mongodb successfully....'))
.catch(err =>console.log('Failed to connect to mongodb!',err));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const API = config.API_VERSION;
app.use(`${API}/user`, usersRouter)
app.use(`${API}/blogs`, blogsRoutes);
app.use(`${API}/comments`, commentsRoutes);
app.use(`${API}/inquiries`, inquiryRoutes);

app.get('/',(req, res)=>{
    res.send({
        message: "Welcome to my capstone app 🖐🏿😃"
    }).status(200)
});

const port = process.env.PORT;
app.listen(port, () => { 
    console.log("App connected on port " + port);
});