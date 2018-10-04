import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg } from '../../utils/helpers';

/**
 * @description This controller create Menu Items
 * @param {object} req
 * @param {object} res
 * @returns {object} responseMsg
 */
export const createMenu = (req, res) => {
  const { id } = req.authData;
  const {
    food_name, description, category, price,
  } = req.body;
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  db.query(query, values)
    .then((admin) => {
      if (admin.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, 'fail', 'admin access only');
      }
      const query = 'INSERT INTO food_menus(id,food_name, description, category, price, created_date,modified_date) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
      const values = [
        uuid(),
        food_name,
        description,
        category,
        price,
        new Date(),
        new Date()];
      db.query(query, values)
        .then(menuItem => responseMsg(res, 201, 'success', 'menu created', menuItem.rows[0]))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
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
      return responseMsg(res, 200, 'success', 'menu retrival successful', menu.rows);
    })
    .catch(error => res.status(404).json(error));
};

export const imageUpload = (req, res) => {
  const { id } = req.authData;
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  db.query(query, values)
    .then((admin) => {
      if (admin.rows[0].user_status !== 'admin') {
        return responseMsg(res, 403, 'fail', 'admin access only');
      }
      const { food_name } = req.body;
      const image = `${req.file.destination}${req.file.filename}`;
      console.log(image);
      const query = 'UPDATE food_menus SET image = $1 WHERE food_name = $2 RETURNING *';
      const value = [image, food_name];
      db.query(query, value)
        .then((menuImage) => {
          console.log(menuImage.rows);
          if (!menuImage.rows[0].image) {
            return responseMsg(res, 400, 'fail', 'No image uploaded');
          }
          return responseMsg(res, 200, 'success', 'file upload successful', menuImage.rows[0]);
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
};
