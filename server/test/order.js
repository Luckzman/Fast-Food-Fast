import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

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

const order = {
  food_name: 'meat_pie',
  quantity_ordered: 10,
};


describe('EMPTY ORDERS TABLE', () => {
  it('should return no content if order table is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
  });
});

describe('/INVALID ORDER PARAMS ID', () => {
  it('should ensure order params id is UUID', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders/999dad61-3bac-509a-968386e0bb32b627')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
});

describe('PLACE ORDER', () => {
  it('should allow regular users to place an order', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/menu')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            chai.request(app)
              .post('/api/v1/orders')
              .set('Authorization', `Bearer ${token}`)
              .send(order)
              .end((err, res) => {
                res.should.have.status(201);
                done();
              });
          });
      });
  });
  it('should not allow quantity ordered to be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/orders')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'meat_pie',
            quantity_ordered: '',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('quantity ordered must be an integer', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/orders')
          .set('Authorization', `Bearer ${token}`)
          .send({
            food_name: 'meat_pie',
            quantity_ordered: 'abc',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
});

describe('GET ALL ORDERS', () => {
  it('should allow ONLY ADMIN to access all orders', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  it('should not allow regular users to access all orders', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
  });
});

describe('GET A SPECIFIC ORDER', () => {
  it('should allow admin to access a specific order', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders/')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            const { id } = res.body.data[0];
            chai.request(app)
              .get(`/api/v1/orders/${id}`)
              .set('Authorization', `Bearer ${token}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
  });

  it('should NOT allow regular users to access a specific order', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders/')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
  });
});

describe('UPDATE AN ORDER STATUS', () => {
  it('should allow only admin to update an order status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders/')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            const { id } = res.body.data[0];
            chai.request(app)
              .put(`/api/v1/orders/${id}`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                food_name: 'meat_pie',
                quantity_ordered: 10,
                order_status: 'processing',
              })
              .end((err, res) => {
                res.should.have.status(201);
                done();
              });
          });
      });
  });

  it('should not allow admin to update order status with invalid entries', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders/')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            const { id } = res.body.data[0];
            chai.request(app)
              .put(`/api/v1/orders/${id}`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                food_name: 'meat_pie',
                quantity_ordered: 10,
                order_status: 'proce',
              })
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
      });
  });

  it('should not allow regular users to update an order status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/orders/')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
  });
});
