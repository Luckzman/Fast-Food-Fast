import db from '../../model/db/config';
import responseMsg from '../../utils/helpers';

/**
 * This controller to get user order history
 * @param {object} req
 * @param {object} res
 */
const getUserOrderHistory = (req, res) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((user) => {
      const query = 'SELECT * FROM orders WHERE id = $1';
      const value = [user.rows[0].id];
      db.query(query, value)
        .then((userOrder) => {
          if (!userOrder.rows[0]) {
            return responseMsg(res, 404, 'fail', 'No order has been placed');
          }
          return responseMsg(res, 200, 'success', 'User Order History Request Successful', userOrder.rows[0]);
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
};

export default getUserOrderHistory;
