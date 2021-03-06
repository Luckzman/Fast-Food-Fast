import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import db from '../../model/db/config';
import { responseMsg, userResponseMsg } from '../../utils/helpers';


/**
 * @description signup controller
 * @param {object} req
 * @param {object} res
 */
export const signup = (req, res) => {
  const {
    firstname, lastname, phone, email, password, image,
  } = req.body;
  const user_status = req.body.user_status || 'regular';
  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];
  db.query(query, value)
    .then((user) => {
      if (user.rows[0]) {
        return responseMsg(res, 400, 'fail', 'User already exist');
      }
      bcrypt.hash(password, 8)
        .then((hash) => {
          const query = 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10) returning id, firstname, lastname, email, phone, image, user_status, created_date';
          const values = [
            uuid(),
            firstname,
            lastname,
            email,
            phone,
            hash,
            image,
            user_status,
            new Date(),
            new Date()];
          db.query(query, values)
            .then(user => userResponseMsg(res, 201, 'success', 'Signup successful', user.rows[0]))
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
  const query = 'SELECT * FROM users WHERE email = $1';
  const value = [email];

  db.query(query, value)
    .then((user) => {
      if (!user.rows[0]) {
        return responseMsg(res, 404, 'fail', 'Email not Found');
      }
      bcrypt.compare(password, user.rows[0].password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({
              id: user.rows[0].id,
              user_status: user.rows[0].user_status,
            }, process.env.SECRET_KEY,
            {
              expiresIn: '6h',
            });
            console.log(user.rows[0].user_status);
            return responseMsg(res, 200, 'success', 'login successful', { token, user_status: user.rows[0].user_status });
          }
          return responseMsg(res, 400, 'fail', 'Password is incorrect');
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
};
