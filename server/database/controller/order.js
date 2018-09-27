// import db from './../model/config';
import { responseMsg } from '../middleware/helpers';

export const placeOrder = (req, res) => {
  return responseMsg(res, 201, true, 'place order OK');
};

export const getAllOrder = (req, res) => {
  return responseMsg(res, 200, true, 'get All Order OK');
};

export const getOrderItem = (req, res) => {
  return responseMsg(res, 200, true, 'get an Order OK');
};

export const updateOrderStatus = (req, res) => {
  return responseMsg(res, 200, true, 'update order status OK');
};
