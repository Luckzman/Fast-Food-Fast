import express from 'express';
import { createMenu, getMenu } from '../controller/db_controller/menu';
import authCheck from '../utils/auth_checker';

const menuRouter = express.Router();

menuRouter.post('/', authCheck, createMenu);
menuRouter.get('/', getMenu);

export default menuRouter;
