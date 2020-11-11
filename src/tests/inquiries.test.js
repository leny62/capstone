import request from 'supertest';
import mongoose from 'mongoose';
import config from '../config/config';
import {signToken} from '../helper/signToken';
import Inquiries from '../models/inquiry';
import app from '../../app';
import Blog from '../models/blogs';
import { add } from 'lodash';

const DB_Url = config.CONNECTION_URL_Testing;

jest.useFakeTimers();

describe('Testing Inquiries', () => {
    // beforeAll(() => {
    //     mongoose.connect(DB_Url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true
    //     });
    // });
    let token;
    let inquiry;
    
    beforeEach( async () => {
        const user1 = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name: 'leny IHIRWE',
            email: 'lihirwe6@gmail.com',
            password: 'leny123'
        };
        
        inquiry = {
            author: user1.name,
            inquiry: 'This is software development'
        }
        token = signToken(user1);
    });
    
    afterEach( async () => await Inquiries.deleteMany());
    
    test('All inquiries', async (done) => {
        const res = await request(app)
            .get('/api/v1/inquiries')
            .set('auth-token', token);
            
            expect(res.status).toBe(200);
            done();
    });
    
    test('Create inquiry', async (done) => {
        const res = await request(app)
            .post('/api/v1/inquiries/addInquiry')
            .set('auth-token', token)
            .send(inquiry);
            
            expect(res.status).toBe(200);
            done();
    });
    
    test('Delete inquiry', async (done) => {
        const newInquiry = await Inquiries(inquiry);
        const addedInquiry = await newInquiry.save();
        const id = addedInquiry._id;
        
        const res = await request(app)
            .delete(`/api/v1/inquiries/delete/${id}`)
            .set('auth-token', token);
            
        expect(res.status).toBe(200);
        done();
    });
});