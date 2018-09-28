import moment from 'moment';
import uuid from 'uuid';
import db from '../model/config';
import { responseMsg } from '../middleware/helpers';

export const placeOrder = (req, res) => {
  const query = 'SELECT * FROM food_menus WHERE id = $1';
  const value = [req.body.id];
  db.query(query, value)
    .then((menu) => {
      if (!menu.rows[0]) {
        return responseMsg(res, 404, false, 'menu not found');
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
        .then(order => responseMsg(res, 201, true, 'menu successfully ordered', order.rows[0]))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
};

export const getAllOrder = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      if (user.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, false, 'No permission to access this resource');
      }
      const query = 'SELECT * FROM orders';
      db.query(query)
        .then(order => responseMsg(res, 200, true, 'Order All Request Successful', order.rows[0]))
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};

export const getOrderItem = (req, res) => responseMsg(res, 200, true, 'get an Order OK');

export const updateOrderStatus = (req, res) => responseMsg(res, 200, true, 'update order status OK');
