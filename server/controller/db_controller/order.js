import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg } from '../../utils/helpers';

/**
 * @description This controller will place a new order
 * @param {object} req
 * @param {object} res
 */
export const placeOrder = (req, res) => {
  const query = 'SELECT * FROM food_menus WHERE food_name = $1';
  const value = [req.body.food_name];
  db.query(query, value)
    .then((menu) => {
      console.log(menu.rows[0]);
      const { quantity_ordered } = req.body;
      const query = 'INSERT INTO orders(id, quantity_ordered,created_date, modified_date,user_id, menu_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const value = [uuid(),
        quantity_ordered,
        new Date(),
        new Date(),
        req.authData.id,
        menu.rows[0].id];
      db.query(query, value)
        .then(order => responseMsg(res, 201, 'success', 'menu successfully ordered', order.rows[0]))
        .catch(error => res.status(400).json(error));
    });
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
      const query = 'SELECT orders.id, firstname, lastname, food_name, quantity_ordered, price, order_status, orders.created_date FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN food_menus ON orders.menu_id = food_menus.id';
      db.query(query)
        .then((order) => {
          if (!order.rows[0]) {
            return responseMsg(res, 204, 'success', 'No Order Content');
          }
          return responseMsg(res, 200, 'success', 'Order All Request Successful', order.rows);
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller get a single order item
 * @param {object} req
 * @param {object} res
 */
export const getSingleOrder = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      if (user.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, 'fail', 'Admin Access Only');
      }
      const query = 'SELECT orders.id, firstname, lastname, food_name, quantity_ordered, price, order_status, orders.created_date FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN food_menus ON orders.menu_id = food_menus.id WHERE orders.id = $1';
      const value = [req.params.id];
      db.query(query, value)
        .then((order) => {
          if (order) {
            return responseMsg(res, 200, 'success', 'Order Single Item Request Successful', order.rows[0]);
          }
          return responseMsg(res, 204, 'success', 'Empty Order Entry');
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
        return responseMsg(res, 403, 'fail', 'Admin Access Only');
      }
      const query = 'UPDATE orders SET order_status = $1, modified_date = $2 WHERE id = $3 RETURNING *';
      const values = [req.body.order_status, new Date(), req.params.id];
      db.query(query, values)
        .then((order) => {
          if (order) {
            return responseMsg(res, 201, 'success', 'Update request successful', order.rows[0]);
          }
          return responseMsg(res, 404, 'fail', 'Wrong Order Update Input');
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
};
