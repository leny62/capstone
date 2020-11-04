import request from 'supertest';
import mongoose from 'mongoose';
const {users} = require('../models/users');
// import Blog from '../models/blogs';
import dotenv from 'dotenv';
import app from '../../app';
import { JsonWebTokenError } from 'jsonwebtoken';

dotenv.config();

jest.useFakeTimers();

  describe('=============== test sign up =====================', () => {
  
    it('should signup user', (done) => {
      const res = request(app)
        .post(`/api/v1/user/signUp`)
        
      expect(res.status).toBe(undefined);
      done();
    });
  });