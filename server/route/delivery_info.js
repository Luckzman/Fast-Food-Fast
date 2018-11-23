import express from 'express';
import authCheck from '../utils/auth_checker';
import {
  createDeliveryInfo,
  getDeliveryInfo,
  updateDeliveryInfo,
} from '../controller/db_controller/delivery_info';

const deliveryInfoRouter = express.Router();

deliveryInfoRouter.post('/', authCheck, createDeliveryInfo);
deliveryInfoRouter.get('/', authCheck, getDeliveryInfo);
deliveryInfoRouter.put('/', authCheck, updateDeliveryInfo);

export default deliveryInfoRouter;
