import db from '../../model/db/config';
import { responseMsg, orderResponseMsg, userResponseMsg } from '../../utils/helpers';

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
  const query = 'SELECT users.id, firstname, lastname, address, city, state, phone FROM users_address INNER JOIN users ON users_address.user_id = users.id';

  db.query(query)
    .then(users => userResponseMsg(res, 200, 'success', 'get request succesful', users.rows))
    .catch(error => res.status(400).json(error));
};
/**
 * @description This controller gets a single user
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
