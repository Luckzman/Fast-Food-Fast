import express from 'express';
import { createMenu, getMenu } from '../database/controller/menu';
import { authCheck } from '../database/middleware/helpers';

const menuRouter = express.Router();

menuRouter.post('/', authCheck, createMenu);
menuRouter.get('/', getMenu);

export default menuRouter;
