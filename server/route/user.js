import express from 'express';
import {
  getUserOrderHistory,
  getUser,
  getAllUsers,
  updateUser,
} from '../controller/db_controller/user';
import { profileImg } from '../utils/helpers';
import authCheck from '../utils/auth_checker';

const userRouter = express.Router();

userRouter.get('/', authCheck, getUser);
userRouter.put('/', profileImg.single('image'), authCheck, updateUser);
userRouter.get('/admin', authCheck, getAllUsers);
userRouter.get('/orders', authCheck, getUserOrderHistory);

export default userRouter;
