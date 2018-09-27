// import db from './../model/config';
import { responseMsg } from '../middleware/helpers';

const getUserOrderHistory = (req, res) => responseMsg(res, 200, true, 'get user update order history OK');

export default getUserOrderHistory;
