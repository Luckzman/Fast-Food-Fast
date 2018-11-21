import express from 'express';
import {
  getUserOrderHistory,
  getUser,
  getAllUsers,
} from '../controller/db_controller/user';
import authCheck from '../utils/auth_checker';

const userRouter = express.Router();

userRouter.get('/', authCheck, getUser);
userRouter.get('/admin', authCheck, getAllUsers);
userRouter.get('/orders', authCheck, getUserOrderHistory);

export default userRouter;
