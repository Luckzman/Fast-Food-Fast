import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const user = {
  email: 'admin@fastfoodfast.com',
  password: '12345678aB@',
};
const order = {
  food_name: 'meat_pie',
  quantity_ordered: 20,
};

describe('USER ORDER HISTORY', () => {
  it('should return NO CONTENT if user is yet to place an order', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .get('/api/v1/user/orders')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
  });
  it('should ensure regular users have access to their order history', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.data;
        chai.request(app)
          .post('/api/v1/orders/')
          .set('Authorization', `Bearer ${token}`)
          .send(order)
          .end((err, res) => {
            res.should.have.status(201);
            chai.request(app)
              .get('/api/v1/user/orders')
              .set('Authorization', `Bearer ${token}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
  });
});
