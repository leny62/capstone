import request from 'supertest';
import mongoose from 'mongoose';
import Blog from '../models/blogs';
import dotenv from 'dotenv';
import app from '../../app';
import { JsonWebTokenError } from 'jsonwebtoken';

dotenv.config();
// const CONNECTION_URL_TEST = 'mongodb://localhost:27017/testing';

jest.useFakeTimers();

describe('GET blog', () => {
    beforeAll(() => {
        mongoose.connect(`mongodb://localhost:27017/testing`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    });
    afterEach(async () => await Blog.remove());

    test('Get blogs', async (done) => {
       const res = await request(app)
       .get('/api/v1/blogs')
       
       expect(res.status).toEqual(200);
       done(); 
    })
});

describe('Post blog', () => {
    beforeAll(() => {
        mongoose.connect(`mongodb://localhost:27017/testing`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    });
    afterEach(async () => await Blog.remove());

    test('Post blog', async (done) => {
       const res = await request(app)
       .get('/api/v1/blogs')
       
       expect(res.status).toEqual(200);
       done(); 
    })
});




// less than and greaterthan
test('Should be under 1600', () => {   
    const load1 = 800;    
    const load2 = 700;  
    expect(load1 + load2).toBeLessThan(1600);
});