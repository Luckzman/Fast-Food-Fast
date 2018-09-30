import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const admin = {
  email: 'admin@fastfoodfast.com',
  password: '12345678aB@',
};

const user = {
  email: 'user@fastfoodfast.com',
  password: '12345678aB@',
};


const menu = {
  food_name: 'meat_pie',
  description: 'Fresh and tasty',
  category: 'pastas',
  price: '500',
  image: 'file://meat.jpg',
};

describe('EMPTY MENU TABLE', () => {
  it('should return no content if menu table is empty', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});


describe('CREATE MENU', () => {
  it('should allow only admin to create a menu', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send(menu)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
  });
  it('should NOT allow regular users to create food menu', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send(menu)
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
  });
  it('should ensure admin input food name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: '',
            description: 'Fresh and tasty',
            category: 'pastas',
            price: '500',
            image: 'file://meat.jpg',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should ensure that admin fills the description field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'Fried Rice',
            description: '',
            category: 'pastas',
            price: '500',
            image: 'file://meat.jpg',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should ensure admin select a category', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'fried Rice',
            description: 'Fresh and tasty',
            category: '',
            price: '500',
            image: 'file://meat.jpg',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should ensure admin input food price', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'Fried Rice',
            description: 'Fresh and tasty',
            category: 'pastas',
            price: '',
            image: 'file://meat.jpg',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should ensure food price is a positive integer', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'Fried Rice',
            description: 'Fresh and tasty',
            category: 'pastas',
            price: 'asd',
            image: 'file://meat.jpg',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should ensure that admin upload an image', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'Fried Rice',
            description: 'Fresh and tasty',
            category: 'pastas',
            price: '500',
            image: '',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
});


describe('GET ALL MENU', () => {
  it('should get all food menu', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
