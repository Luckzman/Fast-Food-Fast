import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg, cartResponseMsg } from '../../utils/helpers';

export const addToCart = (req, res) => {
  const user_id = req.authData.id;
  const menu_id = req.body.id;
  const query = 'SELECT * FROM food_menus WHERE id=$1';
  const value = [menu_id];
  db.query(query, value)
    .then((menu) => {
      if (!menu.rows[0]) {
        return responseMsg(res, 404, 'fail', 'Menu not found');
      }
      const { quantity_ordered } = req.body;
      const query = 'INSERT INTO order_items(id, quantity_ordered, created_date, modified_date, menu_id, user_id, order_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      const values = [uuid(), quantity_ordered, order_status, new Date(), new Date(), menu.rows[0].id, user_id];
      db.query(query, values)
        .then(cart => cartResponseMsg(res, 201, 'success', 'order item added to cart', cart.rows[0]))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
};

export const getCart = (req, res) => {
  const { id } = req.authData;
  const query = 'SELECT image, food_name, quantity_ordered, category, price, order_items.modified_date FROM order_items INNER JOIN food_menus ON order_items.menu_id = food_menus.id INNER JOIN orders ON order_items.order_id = orders.id WHERE orders.user_id = $1 AND order_items.order_id IS NULL';
  const value = [id];
  db.query(query, value)
    .then((cart) => {
      if (!cart.rows[0]) {
        return responseMsg(res, 200, 'success', 'No Item in cart');
      }
      return responseMsg(res, 200, 'success', 'Cart Item Found', cart.rows);
    })
    .catch(error => res.status(404).json(error));
};

export const updateCartQty = (req, res) => {

  responseMsg(res, 200, 'success', 'put request successful')
};
