import express from 'express';
import {
  getUserOrderHistory,
  createDeliveryInfo,
  getDeliveryInfo,
  updateDeliveryInfo,
  getUser,
  getAllUsers,
} from '../controller/db_controller/user';
import authCheck from '../utils/auth_checker';

const userRouter = express.Router();

userRouter.get('/', authCheck, getUser);
userRouter.get('/admin', authCheck, getAllUsers);
userRouter.get('/orders', authCheck, getUserOrderHistory);
userRouter.post('/delivery_info', authCheck, createDeliveryInfo);
userRouter.get('/delivery_info', authCheck, getDeliveryInfo);
userRouter.put('/delivery_info', authCheck, updateDeliveryInfo);

export default userRouter;
