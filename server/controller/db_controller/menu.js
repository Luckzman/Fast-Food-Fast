import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg, menuResponseMsg } from '../../utils/helpers';

/**
 * @description This controller create Menu Items
 * @param {object} req
 * @param {object} res
 * @returns {object} responseMsg
 */
export const createMenu = (req, res) => {
  const {
    food_name, description, category, price,
  } = req.body;
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'admin access only');
  }
  if (!req.file) {
    return responseMsg(res, 400, 'fail', 'No image uploaded');
  }
  const image = `${req.file.destination}${req.file.filename}`;
  const query = 'SELECT * FROM food_menus WHERE food_name = $1';
  const value = [req.body.food_name];
  db.query(query, value)
    .then((menu) => {
      if (menu.rows[0]) {
        return responseMsg(res, 400, 'fail', 'Menu is already created');
      }
      const query2 = 'INSERT INTO food_menus(id, food_name, description, category, price, image, created_date,modified_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      const values = [
        uuid(),
        food_name,
        description,
        category,
        price,
        image,
        new Date(),
        new Date()];
      db.query(query2, values)
        .then(menuItem => menuResponseMsg(res, 201, 'success', 'menu created', menuItem.rows[0]))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller allows all users get access to the entire food menu.
 * @param {object} req
 * @param {object} res
 * @returns {object} responseMsg
 */
export const getMenu = (req, res) => {
  const query = 'SELECT * FROM food_menus';
  db.query(query)
    .then((menu) => {
      if (!menu.rows[0]) {
        return responseMsg(res, 200, 'success', 'No menu available');
      }
      return menuResponseMsg(res, 200, 'success', 'menu retrival successful', menu.rows);
    })
    .catch(error => res.status(404).json(error));
};

export const imageUpload = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'admin access only');
  }
  const { id } = req.body;
  if (!req.file) {
    return responseMsg(res, 400, 'fail', 'No image uploaded');
  }
  const image = `${req.file.destination}${req.file.filename}`;
  const query = 'UPDATE food_menus SET image = $1 WHERE id = $2 RETURNING *';
  const value = [image, id];
  db.query(query, value)
    .then(menuImage => responseMsg(res, 200, 'success', 'file upload successful', menuImage.rows[0]))
    .catch(error => res.status(400).json(error));
};
