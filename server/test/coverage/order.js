import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const admin = {
  email: 'admin@fastfoodfast.com',
  password: 'admin',
};

const user = {
  email: 'user@fastfoodfast.com',
  password: '12345',
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

// describe('/INVALID ORDER PARAMS', () => {
//   it('admin should have access to a single order', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders/')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             const { id } = res.body.data[0];
//             chai.request(app)
//               .get(`/api/v1/orders/${id}`)
//               .set('Authorization', `Bearer ${token}`)
//               .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//               });
//           });
//       });
//   });
// });

describe('PLACE ORDER', () => {
  it('should allow regular users to place an order', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
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
//   it('quantity ordered must be an integer', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .send(order)
//           .end((err, res) => {
//             res.should.have.status(201);
//             done();
//           });
//       });
//   });
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
