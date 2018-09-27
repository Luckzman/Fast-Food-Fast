import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

const newOrder = {
  id: 1,
  customer_name: 'Olumide Emmanuel',
  customer_address: '5, Itori Street, Aguda',
  city: 'Surulere',
  additional_info: '',
  phone_no: 1,
  ordered_food: 'Burger',
  quantity_ordered: '2',
  total_price: '1000',
  date_ordered: '24/08/2018',
  status: 'pending',
};
/**
 * Test Steps:
 * 1. create new order
 * 2. get all order
 * 3. get a single order
 * 4. update order status
 */
describe('/CREATE NEW ORDER', () => {
  it('should create new order', (done) => {
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
  it('should be able to get all orders', (done) => {
    chai.request(app)
      .get('/api/v1/order')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').equals(true);
        done();
      });
  });
});
describe('/GET SINGLE ORDER', () => {
  it('should be able to get an order by its id', (done) => {
    chai.request(app)
      .get('/api/v1/order/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').equals(true);
        done();
      });
  });
  it('should not order if id does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/order/5')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('success').equals(false);
        done();
      });
  });
});
describe('/UPDATE ORDER STATUS', () => {
  it('should be able to update an order by its id', (done) => {
    chai.request(app)
      .put('/api/v1/order/1')
      .send({ status: 'delivered' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('success').equals(true);
        done();
      });
  });
  it('should not update order if id does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/order/5')
      .send({ status: 'delivered' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('success').equals(false);
        done();
      });
  });
});
