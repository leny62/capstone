import request from 'supertest';
import mongoose from 'mongoose';
import Blog from '../models/blogs';
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
