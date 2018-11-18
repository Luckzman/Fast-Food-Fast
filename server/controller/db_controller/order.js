import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg, orderResponseMsg } from '../../utils/helpers';

/**
 * @description This controller will place a new order
 * @param {object} req
 * @param {object} res
 */
export const placeOrder = (req, res) => {
  const { cart, additional_info } = req.body;
  const query = 'INSERT INTO orders(id, cart, additional_info, created_date, modified_date,user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [uuid(),
    cart,
    additional_info,
    new Date(),
    new Date(),
    req.authData.id];
  db.query(query, value)
    .then(order => orderResponseMsg(res, 201, 'success', 'menu successfully ordered', order.rows[0]))
    .catch(error => res.status(400).json(error));
};


/**
 * @description This controller get all orders
 * @param {object} req
 * @param {object} res
 */
export const getAllOrder = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'Admin Access Only');
  }
  const query = 'SELECT orders.id, firstname, lastname, cart, address, city, state, additional_info, order_status, orders.created_date FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN users_address  ON users.id = users_address.user_id';
  db.query(query)
    .then((order) => {
      if (order.rows[0]) {
        return orderResponseMsg(res, 200, 'success', 'Order Request Successful', order.rows);
      }
      return responseMsg(res, 200, 'success', 'Empty Order Entry');
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller get a single order item
 * @param {object} req
 * @param {object} res
 */
export const getSingleOrder = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'Admin Access Only');
  }
  const query = 'SELECT orders.id, firstname, lastname, cart, address, city, state, additional_info, order_status, orders.created_date FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN users_address  ON users.id = users_address.user_id WHERE orders.id = $1';
  const value = [req.params.id];
  db.query(query, value)
    .then((order) => {
      if (order.rows[0]) {
        return orderResponseMsg(res, 200, 'success', 'Specific Order Request Successful', order.rows[0]);
      }
      return responseMsg(res, 200, 'success', 'Empty Order Entry');
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller update order status
 * @param {object} req
 * @param {object} res
 */
export const updateOrderStatus = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'Admin Access Only');
  }
  const query = 'UPDATE orders SET order_status = $1, modified_date = $2 WHERE id = $3 RETURNING *';
  const values = [req.body.order_status, new Date(), req.params.id];
  db.query(query, values)
    .then((order) => {
      if (order.rows[0]) {
        return orderResponseMsg(res, 200, 'success', 'Update order status request successful', order.rows[0]);
      }
      return responseMsg(res, 400, 'fail', 'order does not exist');
    })
    .catch(error => res.status(400).json(error));
};
