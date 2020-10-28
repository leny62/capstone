import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../index';
import 'dotenv';
import userTestData from './fixtures/usersData';

chai.should();
chai.use(chaiHttp);

describe('=============== test sign up =====================', () => {

  it('should signup user', (done) => {
    chai.request(app)
      .post('/user/signUp')
      .send(userTestData.signupData.successfullUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });


  it('email already exists', (done) => {
    chai.request(app)
      .post('/user/signUp')
      .send(userTestData.signupData.successfullUser)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should not sign-up user,name is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/user/signUp')
      .send(userTestData.signupData.noNameUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not sign-up user,email must be a valid email', (done) => {
    chai.request(app)
      .post('/user/signUp')
      .send(userTestData.signupData.badEmailUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not sign-up user, name must only contain alpha-numeric characters', (done) => {
    chai.request(app)
      .post('/user/signUp')
      .send(userTestData.signupData.badInputUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res).to.have.status(400);
        done();
      });
  });
});

// describe('Test sign in', () => {
//   it('should signin user', (done) => {
//     chai.request(app)
//       .post('/auth/signin')
//       .send(dumbData[6])
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
//   it('password is invalid', (done) => {
//     chai.request(app)
//       .post('/auth/signin')
//       .send(dumbData[7])
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });
//   it('email not found', (done) => {
//     chai.request(app)
//       .post('/auth/signin')
//       .send(dumbData[8])
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });
//   it('email is not allowed to be empty', (done) => {
//     chai.request(app)
//       .post('/auth/signin')
//       .send(dumbData[9])
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });
//   it('password is not allowed to be empty', (done) => {
//     chai.request(app)
//       .post('/auth/signin')
//       .send(dumbData[9])
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   it('password not found', (done) => {
//     chai.request(app)
//       .post('/auth/signin')
//       .send(dumbData[16])
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });
// });

