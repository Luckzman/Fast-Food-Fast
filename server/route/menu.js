import express from 'express';
import authChecker from '../utils/auth_checker';
import { menuValidator, urlParamsChecker, reviewsValidator } from '../utils/validate';
import { upload } from '../utils/helpers';
import {
  createMenu, getMenu, getMenuItem, updateMenu, updateMenuImg, deleteMenu, createMenuReview,
} from '../controller/db_controller/menu';

const menuRouter = express.Router();

menuRouter.post('/', upload.single('image'), menuValidator, authChecker, createMenu);
menuRouter.get('/', getMenu);
menuRouter.get('/:id', urlParamsChecker, getMenuItem);
menuRouter.put('/:id', urlParamsChecker, authChecker, updateMenu);
menuRouter.delete('/:id', urlParamsChecker, authChecker, deleteMenu);
menuRouter.post('/:id/review', urlParamsChecker, reviewsValidator, authChecker, createMenuReview);
menuRouter.get('/:id/review', urlParamsChecker, getMenuReviews);
menuRouter.put('/:id/img', urlParamsChecker, upload.single('image'), authChecker, updateMenuImg);

export default menuRouter;
