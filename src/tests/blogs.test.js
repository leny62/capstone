import request from 'supertest';
import mongoose from 'mongoose';
import config from '../config/config';
import {signToken} from '../helper/signToken';
import Blogs from '../models/blogs';
import app from '../../app';
import Blog from '../models/blogs';
import { add } from 'lodash';

const DB_Url = config.CONNECTION_URL_Testing;

jest.useFakeTimers();

describe('Testing Blogs', () => {
    // beforeAll(() => {
    //     mongoose.connect(DB_Url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true
    //     });
    // });
    let token;
    let blog;
    
    beforeEach( async () => {
        const user1 = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name: 'Jayb Muhire',
            email: 'muhire@gmail.com',
            password: 'Muhire123@'
        };
        
        blog = {
            title: 'Software development',
            author: user1.name,
            content: 'This is software development'
        }
        token = signToken(user1);
    });
    
    afterEach( async () => await Blogs.deleteMany());
    
    test('All blogs', async (done) => {
        const res = await request(app)
            .get('/api/v1/blogs')
            .set('auth-token', token);
            
            expect(res.status).toBe(200);
            done();
    });
    
    test('Create blog', async (done) => {
        const res = await request(app)
            .post('/api/v1/blogs/addBlog')
            .set('auth-token', token)
            .send(blog);
            
            expect(res.status).toBe(200);
            done();
    });
    
    test('Delete blog', async (done) => {
        const newBlog = await Blog(blog);
        const addedBlog = await newBlog.save();
        const id = addedBlog._id;
        
        const res = await request(app)
            .delete(`/api/v1/blogs/delete/${id}`)
            .set('auth-token', token);
            
        expect(res.status).toBe(200);
        done();
    });
    
    test('Blog Update', async (done) => {
        
        const newBlog = await Blog(blog);
        const addedBlog = await newBlog.save();
        const id = addedBlog._id;
        
        const res = await request(app)
            .put(`/api/v1/blogs/${id}`)
            .set('auth-token', token)
            .send({
                title: 'Software development Edited',
                author: 'Anyone',
                content: 'This is software development edited'
            });
            
        expect(res.status).toEqual(404);
        done();
    });
});