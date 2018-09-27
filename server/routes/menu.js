import express from 'express';
import { createMenu, getMenu } from '../database/controller/menu';
import { authCheck } from '../database/middleware/helpers';

const authRouter = express.Router();

authRouter.post('/', authCheck, createMenu);
authRouter.get('/', getMenu);

export default authRouter;
