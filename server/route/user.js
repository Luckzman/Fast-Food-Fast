import express from 'express';
import getUserOrderHistory from '../database/controller/user';
import { authCheck } from '../database/middleware/helpers';

const userRouter = express.Router();

userRouter.get('/:id/orders', authCheck, getUserOrderHistory);

export default userRouter;
