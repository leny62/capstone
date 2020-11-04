import request from 'supertest';
import mongoose from 'mongoose';
const {Blog} = require('../models/blogs');
const {users} = require('../models/users');
// import Blog from '../models/blogs';
import dotenv from 'dotenv';
import app from '../../app';
import { JsonWebTokenError } from 'jsonwebtoken';

dotenv.config();

jest.useFakeTimers();

describe('GET blog', () => {
    beforeAll(() => {
        mongoose.connect(`mongodb://localhost:27017/testing`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    });
    
    let token;
    let blog;
    
    beforeEach(()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "Leny Pazzo",
            email : "leny@gmail.com",
            password : "Leny12345",
            role: 'standard user'
        };
        
        // token = generateToken(user);
        
        blog = {
          author: user.name,
          title: 'Programming',
          date: "2020-10-29",
          content: 'Best Practice in Programming'
        };
    });
    
    afterEach(async () => await Blog.deleteMany());

    test('Get blogs', async (done) => {
       const res = await request(app)
        .get(`/api/v1/blogs`)
        // .set('auth-token', token);
       
       expect(res.status).toEqual(200);
       done(); 
    });
    
    // test('Get blog by Id', async (done) => {
    //     const blog = await Blog({
    //         author: 'Karara',
    //       title: 'Programming',
    //       date: "2020-10-29",
    //       content: 'Best Practice in Programming'
    //     })
        
    //     const savedblog = await blog.save();
    //     const id = savedblog._id;
        
    //    const res = await request(app)
    //     .get(`/api/v1/blogs/${id}`)
       
    //    expect(res.status).toEqual(404);
    //    done(); 
    // });
    
    test('Post blog', async (done) => {
        const res = await request(app)
        .post(`/api/v1/blogs/addBlog`)
        .send(blog)
        
        expect(res.status).toEqual(200);
        done(); 
    });
    
    test('Delete blog', async (done) => {
        const blog = await Blog({
                    author: 'Karara',
                  title: 'Programming',
                  date: "2020-10-29",
                  content: 'Best Practice in Programming'
                })
        const res = await request(app)
        .post(`/api/v1/blogs/delete/${id}`)
        
        expect(res.status).toEqual(200);
        done(); 
    });
    
    test('Update blog', async (done) => {
        const blog = await Blog({
                    author: 'Karara',
                  title: 'Programming',
                  date: "2020-10-29",
                  content: 'Best Practice in Programming'
                })
        const res = await request(app)
        .post(`/api/v1/blogs//updateBlog/${id}`)
        
        expect(res.status).toEqual(200);
        done(); 
    });
});