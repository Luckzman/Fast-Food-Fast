import express from 'express';
import authChecker from '../utils/auth_checker';
import { menuValidator } from '../utils/validate';
import { upload } from '../utils/helpers';
import { createMenu, getMenu, imageUpload } from '../controller/db_controller/menu';

const menuRouter = express.Router();

menuRouter.post('/', menuValidator, authChecker, createMenu);
menuRouter.get('/', getMenu);
menuRouter.put('/upload', upload.single('image'), authChecker, imageUpload);

export default menuRouter;
