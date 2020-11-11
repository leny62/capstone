import request from 'supertest';
import mongoose from 'mongoose';
import config from '../config/config';
import {signToken} from '../helper/signToken';
import Users from '../models/users';
import app from '../../app';
import { iteratee } from 'lodash';

const DB_Url = config.CONNECTION_URL_Testing;

jest.useFakeTimers();

describe('Testing Users', () => {
  // beforeAll(() => {
  //   mongoose.connect(DB_Url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true
  //   });
  // });
  afterEach( async () => await Users.deleteMany());
  
  it('To signup a new user', async () => {
    const res = await request(app)
      .post('/api/v1/user/signUp')
      .send({
        name: 'Jayb Muhire',
        email: 'muhire@gmail.com',
        password: 'Muhire123@'
    });
    
    expect(res.status).toBe(200);
    // done();
  });
  
  it('User Duplication', async (done) => {
    const user1 = {
      name: 'Jayb Muhire',
      email: 'muhire@gmail.com',
      password: 'Muhire123@'
    };
    const newUser = await Users(user1);
    await newUser.save();
    
    const res = await request(app)
      .post('/api/v1/user/signUp')
      .send({
        name: 'Jayb Muhire',
        email: 'muhire@gmail.com',
        password: 'Muhire123@'
    });
    
    expect(res.status).toBe(200);
    done();
  });
  
  it('Server error', async (done) => {
    const res = await request(app)
      .post('/api/v1/user/signUp')
      .send({
        name: 'Jayb Muhire',
        eemail: 'muhire@gmail.com',
        passcode: 'Muhire123@'
    });
    
    expect(res.status).toBe(200);
    done();
  });
});


describe('Testing User Login', () => {
  // beforeAll(() => {
  //   mongoose.connect(DB_Url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true
  //   });
  // });
  
  beforeEach( async () => {
    const user1 = {
          name: 'Jayb Muhire',
          email: 'muhire@gmail.com',
          password: 'Muhire123@'
        };
    await request(app)
      .post('/api/v1/user/signUp')
      .send(user1);
  });
  afterEach( async () => await Users.deleteMany());
  
  it('Login a user', async (done) => {
    const res = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'muhire@gmail.com',
        password: 'Muhire123@'
      });
    
    expect(res.status).toBe(200);
    done();
  });
  
  it('Login with invalid email', async (done) => {
    const res = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'mu@gmail.com',
        password: 'Muhire123@'
      });
    
    expect(res.status).toBe(200);
    done();
  });
  
  it('Login invalid password', async (done) => {
    const res = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'muhire@gmail.com',
        password: 'Muhire1'
      });
    
    expect(res.status).toBe(200);
    done();
  });
  
  describe('Testing Users', () => {
    // beforeAll(() => {
    //   mongoose.connect(DB_Url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true
    //   });
    // });
    let token;
    
    beforeEach( async () => {
      const user1 = {
            name: 'Jayb Muhire',
            email: 'muhire@gmail.com',
            password: 'Muhire123@',
            role: true
      };
      await request(app)
        .post('/api/v1/user/signUp')
        .send(user1);
        
      token = signToken(user1);
    });
    afterEach( async () => await Users.deleteMany());
    
    it('List of users', async (done) => {
      const res = await request(app)
        .get('/api/v1/user')
        .set('auth-token', token);
      
      expect(res.status).toBe(200);
      done();
    });
    
    it('One user', async (done) => {
      const user1 = {
        name: 'Jayb Muhire',
        email: 'muhire@gmail.com',
        password: 'Muhire123@'
      };
      
      const newUser = await Users(user1);
      const addedUser = await newUser.save();
      const id = addedUser._id;
      
      const res = await request(app)
        .get(`/api/v1/user/${id}`)
        .set('auth-token', token);
      
      expect(res.status).toBe(404);
      done();
    });
    
    it('Delete a user', async () => {
      const user2 = {
        name: 'Jayb Muhire',
        email: 'muhire@gmail.com',
        password: 'Muhire123@'
      };
      
      const newUser = await Users(user2);
      const addedUser = await newUser.save();
      const id = addedUser._id;
      
      const res = await request(app)
        .delete(`/api/v1/user/deleteUser/${id}`)
        .set('auth-token', token)
    });
  });
});
