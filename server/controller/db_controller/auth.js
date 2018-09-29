import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import moment from 'moment';
import db from '../../model/db/config';
import isValidEmail from '../../utils/validate';
import responseMsg from '../../utils/helpers';


/**
 * @description signup controller
 * @param {object} req
 * @param {object} res
 */
export const signup = (req, res) => {
  let {
    firstname, lastname, phone, email, password,
  } = req.body;
  const { user_status } = req.body;

  firstname = firstname.trim();
  lastname = lastname.trim();
  phone = phone.trim();
  email = email.trim();
  password = password.trim();

  if (!firstname
    || !lastname
    || !phone
    || !email
    || !password) {
    return responseMsg(res, 400, 'fail', 'All entries must be filled');
  }

  if (!isValidEmail(email)) {
    return responseMsg(res, 400, 'fail', 'Email is invalid');
  }

  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];
  db.query(query, value)
    .then((user) => {
      if (user.rowCount > 0) {
        return responseMsg(res, 400, 'fail', 'Email already exist');
      }
      bcrypt.hash(password, 8)
        .then((hash) => {
          // const query = 'INSERT INTO users(id, firstname, lastname, email, phone, password, user_status, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
          const query = 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
          const values = [
            uuid(),
            firstname,
            lastname,
            email,
            phone,
            hash,
            user_status,
            moment(new Date()),
            moment(new Date())];
          db.query(query, values)
            .then(user => responseMsg(res, 201, 'success', 'Signup successful', user.rows[0]))
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
    return responseMsg(res, 400, 'fail', 'All fields must be filled');
  }
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, 'fail', 'Enter valid Email');
  }
  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];
  db.query(query, value)
    .then((user) => {
      if (user.rowCount < 1) {
        return responseMsg(res, 404, 'fail', 'Email not Found');
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
            return responseMsg(res, 200, 'success', 'login successful', token);
          }
          return responseMsg(res, 400, 'fail', 'Password is incorrect');
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
};
