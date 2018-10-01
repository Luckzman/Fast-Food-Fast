import express from 'express';
import authChecker from '../utils/auth_checker';
import { menuValidator } from '../utils/validate';
import { upload } from '../utils/helpers';
import { createMenu, getMenu } from '../controller/db_controller/menu';

const menuRouter = express.Router();

menuRouter.post('/', upload.single('image'), menuValidator, authChecker, createMenu);
menuRouter.get('/', getMenu);

export default menuRouter;
