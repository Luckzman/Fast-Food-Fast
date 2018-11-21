import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg } from '../../utils/helpers';

/**
 * @description This controller creates user delivery information
 * @param {object} req
 * @param {object} res
 */
export const createDeliveryInfo = (req, res) => {
  const {
    address, city, state,
  } = req.body;
  const query = 'INSERT INTO users_address(id, address, city, state, created_date, modified_date, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [
    uuid(), address, city, state, new Date(), new Date(), req.authData.id,
  ];
  db.query(query, values)
    .then(info => responseMsg(res, 200, 'success', 'Delivery Info successfully added', info.rows))
    .catch(error => res.status(400).json(error));
};

/**
   * @description This controller update user delivery information
   * @param {object} req
   * @param {object} res
   */
export const updateDeliveryInfo = (req, res) => {
  const {
    address, city, state,
  } = req.body;
  const query = 'UPDATE users_address SET address = $1, city = $2, state = $3, modified_date = $4 WHERE user_id = $5 RETURNING *';
  const values = [
    address, city, state, new Date(), req.authData.id,
  ];
  db.query(query, values)
    .then(info => responseMsg(res, 200, 'success', 'Delivery Info successfully updated', info.rows[0]))
    .catch(error => res.status(400).json(error));
};

/**
   * @description This controller retrieves user delivery information
   * @param {object} req
   * @param {object} res
   */
export const getDeliveryInfo = (req, res) => {
  const query = 'SELECT users.id, firstname, lastname, address, city, state, phone FROM users_address INNER JOIN users ON users_address.user_id = users.id WHERE users.id = $1';
  const value = [req.authData.id];
  db.query(query, value)
    .then((info) => {
      if (!info.rows[0]) {
        return responseMsg(res, 404, 'fail', 'no delivery Information is available');
      }
      return responseMsg(res, 200, 'success', 'delivery infomation successfully retrieved', info.rows[0]);
    })
    .catch(error => res.status(400).json(error));
};
