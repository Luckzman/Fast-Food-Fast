import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg, cartResponseMsg } from '../../utils/helpers';

export const addToCart = (req, res) => {
  const { id } = req.body;
  const query = 'SELECT * FROM food_menus WHERE id=$1';
  const value = [id];
  db.query(query, value)
    .then((menu) => {
      if (!menu.rows[0]) {
        return responseMsg(res, 404, 'fail', 'Menu not found');
      }
      const { quantity_ordered } = req.body;
      const query = 'INSERT INTO order_items(id, quantity_ordered, created_date, modified_date, menu_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const values = [uuid(), quantity_ordered, new Date(), new Date(), menu.rows[0].id];
      db.query(query, values)
        .then(cart => cartResponseMsg(res, 201, 'success', 'order item added to cart', cart.rows[0]))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
};

export const getCart = (req, res) => responseMsg(res, 200, 'success', 'get cart successful');

export const updateCartQty = (req, res) => responseMsg(res, 200, 'success', 'put request successful');
