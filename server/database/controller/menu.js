import uuid from 'uuid';
import moment from 'moment';
import db from '../model/config';
import { responseMsg } from '../middleware/helpers';

/**
 * This controller create Menu Items
 * only Admin can access this route
 * @param {object} req
 * @param {object} res
 * @returns {object} responseMsg
 */
export const createMenu = (req, res) => {
  const { id } = req.authData;
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  db.query(query, values)
    .then((admin) => {
      if (admin.rows[0].user_status !== 'admin') {
        return responseMsg(res, 401, false, 'admin access only');
      }
      let {
        food_name, description, category, price, image,
      } = req.body;
      food_name = food_name.trim();
      description = description.trim();
      category = category.trim();
      price = price.trim();
      image = image.trim();

      if (!food_name || !description || !category || !price || !image) {
        return responseMsg(res, 400, false, 'Fill all entries');
      }
      const query = 'INSERT INTO food_menus(id,food_name, description, category, price, image,created_date,modified_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      const values = [
        uuid(),
        food_name,
        description,
        category,
        price,
        image,
        moment(new Date()),
        moment(new Date())];
      db.query(query, values)
        .then(menu => responseMsg(res, 201, true, 'menu created', menu.rows[0]))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

/**
 * This controller allows all users get access
 * to the entire food menu.
 * @param {object} req
 * @param {object} res
 * @returns {object} responseMsg
 */
export const getMenu = (req, res) => {
  const query = 'SELECT * FROM food_menus';
  db.query(query)
    .then(menu => responseMsg(res, 201, true, 'menu retrival successful', menu.rows))
    .catch(error => res.status(404).json(error));
};
