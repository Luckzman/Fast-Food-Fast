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

const menu = {
  food_name: 'meat_pie',
  description: 'Fresh and tasty',
  category: 'pastas',
  price: '500',
  image: 'file://meat.jpg',
};

describe('/CREATE ORDER', () => {
  it('only admin should create food menu', (done) => {
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
});
