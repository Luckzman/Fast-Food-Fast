import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import moment from 'moment';
import db from '../model/config';
import { isValidEmail, responseMsg } from '../middleware/helpers';


/**
 * @description signup controller
 * @param {object} req
 * @param {object} res
 */
export const signup = (req, res) => {
  /**
    * @description Destructure req.body object
    */
  let {
    firstname, lastname, phone, email, password,
  } = req.body;

  firstname = firstname.trim();
  lastname = lastname.trim();
  phone = phone.trim();
  email = email.trim();
  password = password.trim();
  /**
   * @description Check to ensure no empty entry
   */
  if (!firstname
    || !lastname
    || !phone
    || !email
    || !password) {
    return responseMsg(res, 400, false, 'All entries must be filled');
  }

  /**
   * @description Enforce valid email input
   */
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, false, 'Email is invalid');
  }

  /**
   * @description Ensures no duplicate email entry
   */
  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];
  db.query(query, value)
    .then((user) => {
      if (user.rowCount > 0) {
        return responseMsg(res, 400, false, 'Email already exist');
      }
      bcrypt.hash(password, 8)
        .then((hash) => {
          const query = 'INSERT INTO users(id, firstname, lastname, email, phone, password, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';
          const values = [
            uuid(),
            firstname,
            lastname,
            email,
            phone,
            hash,
            moment(new Date()),
            moment(new Date())];
          db.query(query, values)
            .then(user => responseMsg(res, 201, true, 'Signup successful', user.rows[0]))
            .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
};

/**
 * @description Login Controller
 * @param {object} req
 * @param {object} res
 */
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return responseMsg(res, 400, false, 'All fields must be filled');
  }
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, false, 'Enter valid Email');
  }
  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];
  db.query(query, value)
    .then((user) => {
      if (user.rowCount < 1) {
        return responseMsg(res, 404, false, 'Email not Found');
      }
      bcrypt.compare(password, user.rows[0].password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({
              id: user.rows[0].id,
            }, process.env.SECRET_KEY,
            {
              expiresIn: '6h',
            });
            return responseMsg(res, 200, true, 'login successful', token);
          }
          return responseMsg(res, 400, false, 'Password is incorrect');
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
};
