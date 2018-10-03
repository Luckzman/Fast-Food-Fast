import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const admin = {
  firstname: 'admin_tester',
  lastname: 'admin_tester',
  email: 'admin_tester@fastfoodfast.com',
  password: '12345678aB@',
  phone: '0703455567',
  location: 'Ejigbo',
  user_status: 'admin',
};
const user = {
  firstname: 'user',
  lastname: 'user',
  email: 'user@fastfoodfast.com',
  password: '12345678aB@',
  phone: '0703455567',
  location: 'Isolo',
};

describe('SIGNUP USERS', () => {
  it('should have an admin user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(admin)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        done();
      });
  });
  it('should allow regular user signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should not allow user to signup if email already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'admin',
        lastname: 'admin',
        email: 'admin2admin.com',
        phone: '0703455567',
        password: '12345678aB@',
        user_status: 'regular',
        location: 'Ejigbo',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if first name is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'admin_tester',
        email: 'admin_tester@fastfoodfast.com',
        password: '12345678aB@',
        phone: '0703455567',
        location: 'Ejigbo',
        user_status: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if lastname is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'admin_tester',
        lastname: '',
        email: 'admin_tester@fastfoodfast.com',
        password: '12345678aB@',
        phone: '0703455567',
        location: 'Ejigbo',
        user_status: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'admin_tester',
        lastname: 'admin_tester',
        email: '',
        password: '12345678aB@',
        phone: '0703455567',
        location: 'Ejigbo',
        user_status: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if phone is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'admin_tester',
        lastname: 'admin_tester',
        email: 'admin_tester@fastfoodfast.com',
        password: '12345678aB@',
        phone: '',
        location: 'Ejigbo',
        user_status: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if location is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'admin_tester',
        lastname: 'admin_tester',
        email: 'admin_tester@fastfoodfast.com',
        password: '12345678aB@',
        phone: '0703455567',
        location: '',
        user_status: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


describe('LOGIN USERS', () => {
  it('should allow signup users to login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should not allow user to login if email entered is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@testcom',
        password: '12345678aB@',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user login if email is not in database', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'user@test.co',
        password: '12345678aB@',
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should not allow user to login if password is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'user@fastfoodfast.com',
        password: '12345678aB@a',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user login if any field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: '23dsd@sdf',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
