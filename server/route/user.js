import express from 'express';
import getUserOrderHistory from '../controller/db_controller/user';
import authCheck from '../utils/auth_checker';

const userRouter = express.Router();

userRouter.get('/:id/orders', authCheck, getUserOrderHistory);

export default userRouter;
