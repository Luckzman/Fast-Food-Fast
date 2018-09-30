import express from 'express';
import authChecker from '../utils/auth_checker';
import { menuValidator } from '../utils/validate';
import { createMenu, getMenu } from '../controller/db_controller/menu';

const menuRouter = express.Router();

menuRouter.post('/', menuValidator, authChecker, createMenu);
menuRouter.get('/', getMenu);

export default menuRouter;
