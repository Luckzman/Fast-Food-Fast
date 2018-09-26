import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import moment from 'moment';
import db from '../model/config';
import { isValidEmail, responseMsg } from '../middleware/helpers';

const signup = (req, res) => {
  /**
    * Destructure req.body
    */
  const {
    firstname, lastname, phone, email, password,
  } = req.body;

  /**
   * Check to ensure no empty entry
   */
  if (!firstname
    || !lastname
    || !phone
    || !email
    || !password) {
    responseMsg(res, 400, false, 'All entries must be filled');
  }

  /**
   * Enforce valid email input
   */
  if (!isValidEmail(email)) {
    responseMsg(res, 400, false, 'Email is invalid');
  }
  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];

  /**
   * Ensures no duplicate email entry
   */
  db.query(query, value)
    .then((user) => {
      if (user.rowCount > 0) {
        responseMsg(res, 400, false, 'Email already exist');
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
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

export default signup;
