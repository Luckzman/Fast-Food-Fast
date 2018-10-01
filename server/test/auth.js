import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const admin = {
  firstname: 'admin',
  lastname: 'admin',
  email: 'admin@fastfoodfast.com',
  password: '12345678aB@',
  phone: '0703455567',
  user_status: 'admin',
};
const user = {
  firstname: 'user',
  lastname: 'user',
  email: 'user@fastfoodfast.com',
  password: '12345678aB@',
  phone: '0703455567',
};

describe('SIGNUP USERS', () => {
  it('should have an admin user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(admin)
      .end((err, res) => {
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
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow user to signup if any input is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'admin',
        email: 'admin@test.com',
        phone: '0703455567',
        password: '12345678aB@',
        user_status: 'regular',
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


// const menu = {
//   food_name: 'meat_pie',
//   description: 'Fresh and tasty',
//   category: 'pastas',
//   price: '500',
//   image: 'file://meat.jpg',
// };

// describe('EMPTY MENU TABLE', () => {
//   it('should return no content if menu table is empty', (done) => {
//     chai.request(app)
//       .get('/api/v1/menu')
//       .end((err, res) => {
//         res.should.have.status(204);
//         done();
//       });
//   });
// });


// describe('CREATE MENU', () => {
//   it('should allow only admin to create a menu', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send(menu)
//           .end((err, res) => {
//             res.should.have.status(201);
//             done();
//           });
//       });
//   });
//   it('should NOT allow regular users to create food menu', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send(menu)
//           .end((err, res) => {
//             res.should.have.status(403);
//             done();
//           });
//       });
//   });
//   it('should ensure admin input food name', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: '',
//             description: 'Fresh and tasty',
//             category: 'pastas',
//             price: '500',
//             image: 'file://meat.jpg',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
//   it('should ensure that admin fills the description field', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'Fried Rice',
//             description: '',
//             category: 'pastas',
//             price: '500',
//             image: 'file://meat.jpg',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
//   it('should ensure admin select a category', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'fried Rice',
//             description: 'Fresh and tasty',
//             category: '',
//             price: '500',
//             image: 'file://meat.jpg',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
//   it('should ensure admin input food price', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'Fried Rice',
//             description: 'Fresh and tasty',
//             category: 'pastas',
//             price: '',
//             image: 'file://meat.jpg',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
//   it('should ensure food price is a positive integer', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'Fried Rice',
//             description: 'Fresh and tasty',
//             category: 'pastas',
//             price: 'asd',
//             image: 'file://meat.jpg',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
//   it('should ensure that admin upload an image', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'Fried Rice',
//             description: 'Fresh and tasty',
//             category: 'pastas',
//             price: '500',
//             image: '',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
// });


// describe('GET ALL MENU', () => {
//   it('should get all food menu', (done) => {
//     chai.request(app)
//       .get('/api/v1/menu')
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });


// const order = {
//   food_name: 'meat_pie',
//   quantity_ordered: 10,
// };


// describe('EMPTY ORDERS TABLE', () => {
//   it('should return no content if order table is empty', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(204);
//             done();
//           });
//       });
//   });
// });

// describe('/INVALID ORDER PARAMS ID', () => {
//   it('should ensure order params id is UUID', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders/999dad61-3bac-509a-968386e0bb32b627')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
// });

// describe('PLACE ORDER', () => {
//   it('should allow regular users to place an order', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/menu')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             chai.request(app)
//               .post('/api/v1/orders')
//               .set('Authorization', `Bearer ${token}`)
//               .send(order)
//               .end((err, res) => {
//                 res.should.have.status(201);
//                 done();
//               });
//           });
//       });
//   });
//   it('should not allow quantity ordered to be empty', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'meat_pie',
//             quantity_ordered: '',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
//   it('quantity ordered must be an integer', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .send({
//             food_name: 'meat_pie',
//             quantity_ordered: 'abc',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             done();
//           });
//       });
//   });
// });

// describe('GET ALL ORDERS', () => {
//   it('should allow ONLY ADMIN to access all orders', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(admin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
//       });
//   });
//   it('should not allow regular users to access all orders', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(403);
//             done();
//           });
//       });
//   });
// });

// describe('GET A SPECIFIC ORDER', () => {
//   it('should allow admin to access a specific order', (done) => {
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

//   it('should NOT allow regular users to access a specific order', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders/')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(403);
//             done();
//           });
//       });
//   });
// });

// describe('UPDATE AN ORDER STATUS', () => {
//   it('should allow only admin to update an order status', (done) => {
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
//               .put(`/api/v1/orders/${id}`)
//               .set('Authorization', `Bearer ${token}`)
//               .send({
//                 food_name: 'meat_pie',
//                 quantity_ordered: 10,
//                 order_status: 'processing',
//               })
//               .end((err, res) => {
//                 res.should.have.status(201);
//                 done();
//               });
//           });
//       });
//   });

//   it('should not allow admin to update order status with invalid entries', (done) => {
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
//               .put(`/api/v1/orders/${id}`)
//               .set('Authorization', `Bearer ${token}`)
//               .send({
//                 food_name: 'meat_pie',
//                 quantity_ordered: 10,
//                 order_status: 'proce',
//               })
//               .end((err, res) => {
//                 res.should.have.status(400);
//                 done();
//               });
//           });
//       });
//   });

//   it('should not allow regular users to update an order status', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/orders/')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(403);
//             done();
//           });
//       });
//   });
// });


// // const user2 = {
// //   email: 'admin@fastfoodfast.com',
// //   password: '12345678aB@',
// // };
// const order2 = {
//   food_name: 'meat_pie',
//   quantity_ordered: 20,
// };

// describe('USER ORDER HISTORY', () => {
//   it('should return NO CONTENT if user is yet to place an order', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .get('/api/v1/user/orders')
//           .set('Authorization', `Bearer ${token}`)
//           .end((err, res) => {
//             res.should.have.status(204);
//             done();
//           });
//       });
//   });
//   it('should ensure regular users have access to their order history', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/login')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         const token = res.body.data;
//         chai.request(app)
//           .post('/api/v1/orders/')
//           .set('Authorization', `Bearer ${token}`)
//           .send(order2)
//           .end((err, res) => {
//             res.should.have.status(201);
//             chai.request(app)
//               .get('/api/v1/user/orders')
//               .set('Authorization', `Bearer ${token}`)
//               .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//               });
//           });
//       });
//   });
// });
