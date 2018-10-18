import express from 'express';
import authChecker from '../utils/auth_checker';
import { menuValidator, urlParamsChecker } from '../utils/validate';
import { upload } from '../utils/helpers';
import { createMenu, getMenu, getMenuItem, imageUpload } from '../controller/db_controller/menu';

const menuRouter = express.Router();

menuRouter.post('/', upload.single('image'), menuValidator, authChecker, createMenu);
menuRouter.get('/', getMenu);
menuRouter.get('/:id', urlParamsChecker, getMenuItem);
menuRouter.put('/upload', upload.single('image'), authChecker, imageUpload);

export default menuRouter;
