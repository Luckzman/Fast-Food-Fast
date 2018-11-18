import express from 'express';
import {
  getUserOrderHistory, createDeliveryInfo, getDeliveryInfo, updateDeliveryInfo, getUsers,
} from '../controller/db_controller/user';
import authCheck from '../utils/auth_checker';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/orders', authCheck, getUserOrderHistory);
userRouter.post('/delivery_info', authCheck, createDeliveryInfo);
userRouter.get('/delivery_info', authCheck, getDeliveryInfo);
userRouter.put('/delivery_info/:id', authCheck, updateDeliveryInfo);

export default userRouter;
