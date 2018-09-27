import jwt from 'jsonwebtoken';

export const isValidEmail = email => /\S+@\S+\.\S/.test(email);

export const responseMsg = (res, code, success, message, data) => res.status(code).json({
  success,
  message,
  data,
});

export const authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.authData = decode;
    next();
  } catch (error) {
    return responseMsg(res, 401, false, 'Authentication Failed');
  }
};
