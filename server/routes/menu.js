import express from 'express';
import { createMenu, getMenu } from '../database/controller/menu';

const authRouter = express.Router();

authRouter.post('/', createMenu);
authRouter.get('/', getMenu);

export default authRouter;
