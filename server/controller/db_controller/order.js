import moment from 'moment';
import uuid from 'uuid';
import db from '../../model/db/config';
import responseMsg from '../../utils/helpers';

/**
 * @description This controller will place a new order
 * @param {object} req
 * @param {object} res
 */
export const placeOrder = (req, res) => {
  const query = 'SELECT * FROM food_menus WHERE id = $1';
  const value = [req.body.id];
  db.query(query, value)
    .then((menu) => {
      if (!menu.rows[0]) {
        return responseMsg(res, 404, 'fail', 'menu not found');
      }
      const { quantity_ordered } = req.body;
      const query = 'INSERT INTO orders(id, quantity_ordered,created_date, modified_date,user_id, menu_id) VALUES($1, $2, $3, $4, $5, $6)';
      const value = [uuid(),
        quantity_ordered,
        moment(new Date()),
        moment(new Date()),
        req.authData.id,
        menu.rows[0].id];
      db.query(query, value)
        .then(order => responseMsg(res, 201, 'success', 'menu successfully ordered', order.rows[0]))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller get all orders
 * @param {object} req
 * @param {object} res
 */
export const getAllOrder = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      if (user.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, 'fail', 'No permission to access this resource');
      }
      const query = 'SELECT * FROM orders';
      db.query(query)
        .then(order => responseMsg(res, 200, 'success', 'Order All Request Successful', order.rows))
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller get a single order item
 * @param {object} req
 * @param {object} res
 */
export const getOrderItem = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      if (user.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, 'fail', 'No permission to access this resource');
      }
      const query = 'SELECT * FROM orders WHERE id = $1';
      const value = [req.params.id];
      db.query(query, value)
        .then((order) => {
          if (!order.rows[0]) {
            return responseMsg(res, 404, 'fail', 'order not found');
          }
          return responseMsg(res, 200, 'success', 'Order Single Item Request Successful', order.rows[0]);
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller update order status
 * @param {object} req
 * @param {object} res
 */
export const updateOrderStatus = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      if (user.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, 'fail', 'No permission to access this resource');
      }
      const query = 'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *';
      const values = [req.body.order_status, req.params.id];
      db.query(query, values)
        .then((order) => {
          if (order) {
            return responseMsg(res, 201, 'success', 'Update request successful', order.rows[0]);
          }
          return responseMsg(res, 400, 'fail', 'Wrong Order Update Input');
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};
