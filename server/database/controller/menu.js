import uuid from 'uuid';
import moment from 'moment';
import db from '../model/config';
import { responseMsg } from '../middleware/helpers';

export const createMenu = (req, res) => {
  const {
    food_name, description, category, price, image,
  } = req.body;
  if (!food_name || !description || !category || !price || !image) {
    return responseMsg(res, 400, false, 'Fill all entries');
  }
  const query = 'INSERT INTO food_menus(id,food_name, description, category, price, image,created_date,modified_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
  const values = [
    uuid(), food_name, description, category, price, image, moment(new Date()), moment(new Date())];
  db.query(query, values)
    .then(menu => responseMsg(res, 201, true, 'menu created', menu.rows[0]))
    .catch(error => res.status(400).json({ error }));
};

export const getMenu = (req, res) => responseMsg(res, 200, true, 'get request successful');
