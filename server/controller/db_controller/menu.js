import uuid from 'uuid';
import cloudinary from 'cloudinary';
import db from '../../model/db/config';
import { responseMsg, menuResponseMsg, cloudinaryData } from '../../utils/helpers';

/* cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}); */

cloudinary.config(cloudinaryData);

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
  const query = 'SELECT * FROM food_menus WHERE food_name = $1';
  const value = [req.body.food_name];
  db.query(query, value)
    .then((menu) => {
      if (menu.rows[0]) {
        return responseMsg(res, 400, 'fail', 'Menu is already created');
      }
      cloudinary.uploader.upload(req.file.path, (result) => {
        const image = result.secure_url;
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
      });
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

/**
 * @description This controller allows users to get a single menu details
 * @param {object} req
 * @param {object} res
 */
export const getMenuItem = (req, res) => {
  const query = 'SELECT * FROM food_menus WHERE id=$1';
  const value = [req.params.id];
  db.query(query, value)
    .then((menu) => {
      if (!menu.rows[0]) {
        return responseMsg(res, 404, 'fail', 'Menu not found');
      }
      return menuResponseMsg(res, 200, 'success', 'menu item request successful', menu.rows[0]);
    })
    .catch(error => res.status(404).json(error));
};

/**
 * @description This controller update a specific menu
 * @param {object} req
 * @param {object} res
 * @returns {function} responseMsg
 */
export const updateMenu = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'admin access only');
  }
  const { id } = req.params;
  const {
    food_name, description, price, category,
  } = req.body;
  const query = 'UPDATE food_menus SET food_name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *';
  const value = [food_name, description, price, category, id];
  db.query(query, value)
    .then(menu => menuResponseMsg(res, 200, 'success', 'menu update successful', menu.rows[0]))
    .catch(error => res.status(400).json(error));
};

/**
 * @description This controller update the image of a specific menu
 * @param {object} req
 * @param {object} res
 * @returns {function} responseMsg
 */
export const updateMenuImg = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'admin access only');
  }
  if (!req.file) {
    return responseMsg(res, 400, 'fail', 'No image uploaded');
  }
  cloudinary.uploader.upload(req.file.path, (result) => {
    const image = result.secure_url;
    const query = 'UPDATE food_menus SET image = $1 WHERE id = $2 RETURNING *';
    const value = [image, req.params.id];
    db.query(query, value)
      .then(menuImage => responseMsg(res, 200, 'success', 'file upload successful', menuImage.rows[0]))
      .catch(error => res.status(400).json(error));
  });
};


/**
 * @description This controller delete a specific menu
 * @param {object} req
 * @param {object} res
 * @returns {function} responseMsg
 */
export const deleteMenu = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'admin access only');
  }
  const { id } = req.params;
  const query = 'DELETE FROM food_menus WHERE id = $1';
  const value = [id];
  db.query(query, value)
    .then((menu) => {
      if (menu.rowCount < 1) {
        return responseMsg(res, 200, 'fail', 'menu item does not exist');
      }
      return responseMsg(res, 200, 'success', 'menu item successfully deleted');
    })
    .catch(error => res.status(400).json(error));
};

/**
 * @description This controller add review to a specific menu
 * @param {object} req
 * @param {object} res
 * @returns {function} responseMsg
 */
export const createMenuReview = (req, res) => {
  const query = 'SELECT * FROM reviews WHERE food_menus_id = $1 AND user_id = $2';
  const value = [req.params.id, req.authData.id];
  db.query(query, value)
    .then((menuReviews) => {
      if (menuReviews.rowCount > 0) {
        return responseMsg(res, 400, 'fail', 'user can only add review once');
      }
      const { review, rating } = req.body;
      const query = 'INSERT INTO reviews(id, review, rating, food_menus_id, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const value = [uuid(), review, rating, req.params.id, req.authData.id];
      db.query(query, value)
        .then(reviews => responseMsg(res, 201, 'success', 'review successfully added', reviews.rows[0]))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
};


/**
 * @description This controller view reviews added to a specific menu
 * @param {object} req
 * @param {object} res
 * @returns {function} responseMsg
 */
export const getMenuReviews = (req, res) => {
  const query = 'SELECT * FROM reviews WHERE food_menus_id = $1';
  const value = [req.params.id];
  db.query(query, value)
    .then(reviews => responseMsg(res, 200, 'success', 'user can only add review once', reviews.rows))
    .catch(error => res.status(404).json(error));
};
