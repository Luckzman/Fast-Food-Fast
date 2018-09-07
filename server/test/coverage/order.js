import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const newOrder = {
  orderId: 2,
  name: 'Meat Pie',
  description: 'This is a brief description of the food order',
  quantity: '2',
  image: 'file//image2.jpeg',
  price: '3000',
  date_ordered: '25/08/2018',
  sub_total: '6000',
  status: 'pending',
};
describe('/CREATE NEW ORDER', () => {
  it('it should create new order', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('success').equals(true);
        done();
      });
  });
});
describe('/GET ALL ORDERS', () => {
  it('it should be able to get all orders', (done) => {
    chai.request(app)
      .get('/api/v1/order')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').equals(true);
        done();
      });
  });
});
