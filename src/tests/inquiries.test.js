import request from 'supertest';
import mongoose from 'mongoose';
const {Inquiry} = require('../models/inquiry');
import dotenv from 'dotenv';
import app from '../../app';
import { JsonWebTokenError } from 'jsonwebtoken';

dotenv.config();

jest.useFakeTimers();

describe('GET inquiry', () => {
    beforeAll(() => {
        mongoose.connect(`mongodb://localhost:27017/testing`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    });
    
    let token;
    let inquiry;
    
    beforeEach(()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "Leny Pazzo",
            email : "leny@gmail.com",
            password : "Leny12345",
            role: 'standard user'
        };
        
        // token = generateToken(user);
        
        inquiry = {
          name: user.name,
          email: user.email,
          message: 'Best Practice in Programming'
        };
    });
    
    afterEach(async () => await Inquiry.deleteMany());

    test('Get inquiries', async (done) => {
       const res = await request(app)
        .get(`/api/v1/inquiries`)
        // .set('auth-token', token);
       
       expect(res.status).toEqual(200);
       done(); 
    });
    
    // test('Get blog by Id', async (done) => {
    //     const blog = await Blog({
    //       name: 'Karara',
    //       message: 'Best Practice in Programming'
    //     })
        
    //     const savedblog = await blog.save();
    //     const id = savedblog._id;
        
    //    const res = await request(app)
    //     .get(`/api/v1/blogs/${id}`)
       
    //    expect(res.status).toEqual(404);
    //    done(); 
    // });
    
    test('Post inquiry', async (done) => {
        const res = await request(app)
        .post(`/api/v1/inquiries/sendInquiry`)
        
        expect(res.status).toEqual(200);
        done(); 
    });
    
    // test('Delete inquiry', async (done) => {
    //     const inquiry = await Inquiry({
    //               name: 'Karara',
    //               message: 'Best Practice in Programming'
    //             })
    //             const newInquiry = await Inquiry(inquiry);
    //             const addedInquiry = await newInquiry.save();
    //             const id = addedInquiry._id;        
    //     const res = await request(app)
    //     .post(`/api/v1/inquiries/delete/${id}`)
        
    //     expect(res.status).toEqual(200);
    //     done(); 
    // });
    
    // test('Update inquiry', async (done) => {
    //     const inquiry = await Inquiry({
    //               name: 'Karara',
    //               message: 'Best Practice in Programming'
    //             })
    //     const res = await request(app)
    //     .post(`/api/v1/inquiries/updateBlog/updateStatus/inquiry/:id/status/:status${id}`)
        
    //     expect(res.status).toEqual(200);
    //     done(); 
    // });
});   
