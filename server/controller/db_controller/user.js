import cloudinary from 'cloudinary';
import db from '../../model/db/config';
import { responseMsg, orderResponseMsg, userResponseMsg, cloudinaryData } from '../../utils/helpers';

cloudinary.config(cloudinaryData);

/**
 * @description This controller to get user order history
 * @param {object} req
 * @param {object} res
 */
export const getUserOrderHistory = (req, res) => {
  const query = 'SELECT orders.id, cart, order_status, orders.created_date FROM orders WHERE orders.user_id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((order) => {
      if (!order.rows[0]) {
        return responseMsg(res, 200, 'fail', 'No order has been placed');
      }
      return orderResponseMsg(res, 200, 'success', 'User Order History Request Successful', order.rows);
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller gets all users
 * @param {object} req
 * @param {object} res
 */
export const getAllUsers = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'Admin Access Only');
  }
  const query = 'SELECT users.id, firstname, lastname, email, image, user_status, address, city, state, phone FROM users_address INNER JOIN users ON users_address.user_id = users.id';

  db.query(query)
    .then(users => userResponseMsg(res, 200, 'success', 'get all users request succesful', users.rows))
    .catch(error => res.status(400).json(error));
};

/**
 * @description This controller gets a single user information
 * @param {object} req
 * @param {object} res
 */
export const getUser = (req, res) => {
  const query = 'SELECT users.id, firstname, lastname, email, phone, image, user_status, created_date FROM users WHERE users.id = $1';
  const value = [req.authData.id];

  db.query(query, value)
    .then(users => userResponseMsg(res, 200, 'success', 'get request succesful', users.rows[0]))
    .catch(error => res.status(400).json(error));
};

/**
 * @description This controller updates a single user information
 * @param {object} req
 * @param {object} res
 */
export const updateUser = (req, res) => {
  const { email, phone } = req.body;
  if (!req.file) {
    return responseMsg(res, 400, 'fail', 'No image uploaded');
  }
  cloudinary.uploader.upload(req.file.path, (result) => {
    const image = result.secure_url;
    const query = 'UPDATE users SET email = $1, phone = $2, image = $3, modified_date = $4 WHERE id = $5 RETURNING id, firstname, lastname, email, phone, image, modified_date, created_date';
    const values = [email, phone, image, new Date(), req.authData.id];
  
    db.query(query, values)
      .then(user => userResponseMsg(res, 200, 'success', 'update request succesful', user.rows[0]))
      .catch(error => res.status(400).json(error));
  });
};
