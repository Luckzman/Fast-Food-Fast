import jwt from 'jsonwebtoken';
import responseMsg from './helpers';

const authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.authData = decode;
    next();
  } catch (error) {
    return responseMsg(res, 401, 'fail', 'Authentication Failed');
  }
};

export default authCheck;
