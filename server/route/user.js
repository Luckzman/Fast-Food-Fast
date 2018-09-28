import express from 'express';
import getUserOrderHistory from '../controller/db_controller/user';
import { authCheck } from '../utils/helpers';

const userRouter = express.Router();

userRouter.get('/:id/orders', authCheck, getUserOrderHistory);

export default userRouter;
