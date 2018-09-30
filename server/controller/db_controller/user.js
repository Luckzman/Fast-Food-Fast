import db from '../../model/db/config';
import responseMsg from '../../utils/helpers';

/**
 * @description This controller to get user order history
 * @param {object} req
 * @param {object} res
 */
const getUserOrderHistory = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      const query = 'SELECT orders.id, image, food_name, quantity_ordered, price, order_status, orders.created_date FROM orders INNER JOIN food_menus ON orders.menu_id = food_menus.id WHERE orders.user_id = $1';
      const value = [user.rows[0].id];
      db.query(query, value)
        .then((order) => {
          if (!order.rows[0]) {
            return responseMsg(res, 204, 'fail', 'No order has been placed');
          }
          return responseMsg(res, 200, 'success', 'User Order History Request Successful', order.rows[0]);
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};

export default getUserOrderHistory;
