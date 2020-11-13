import request from 'supertest';
import mongoose from 'mongoose';
import config from '../config/config';
import {signToken} from '../helper/signToken';
import Comments from '../models/comments';
import app from '../../app';
import Blog from '../models/blogs';
import { add } from 'lodash';

const DB_Url = config.CONNECTION_URL_Testing;

jest.useFakeTimers();

describe('Testing Comments', () => {
    // beforeAll(() => {
    //     mongoose.connect(DB_Url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true
    //     });
    // });
    let token;
    let comment;
    
    beforeEach( async () => {
        const user1 = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name: 'Leny Ihirwe',
            email: 'leny@gmail.com',
            password: 'leny123@'
        };
        
        comment = {
            author: user1.name,
            comment: 'This is software development'
        }
        token = signToken(user1);
    });
    
    afterEach( async () => await Comments.deleteMany());
    
    test('All inquiries', async (done) => {
        const res = await request(app)
            .get('/api/v1/comments')
            .set('auth-token', token);
            
            expect(res.status).toBe(200);
            done();
    });
    
    test('Create comment', async (done) => {
        const res = await request(app)
            .post('/api/v1/comments/addComment')
            .set('auth-token', token)
            .send(comment);
            
            expect(res.status).toBe(200);
            done();
    });
    
    test('Delete comment', async (done) => {
        const newComment = await Comments(comment);
        const addedComment = await newComment.save();
        const id = addedComment._id;
        
        const res = await request(app)
            .delete(`/api/v1/comments/delete/${id}`)
            .set('auth-token', token);
            
        expect(res.status).toBe(200);
        done();
    });
});