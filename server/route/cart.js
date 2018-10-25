import express from 'express';
import authCheck from '../utils/auth_checker';
import { urlParamsChecker } from '../utils/validate';
import
{
  addToCart,
  getCart,
  updateCartQty,
} from '../controller/db_controller/cart';

const cartRouter = express.Router();

cartRouter.post('/', authCheck, addToCart);
cartRouter.get('/', authCheck, getCart);
cartRouter.put('/:id', urlParamsChecker, authCheck, updateCartQty);

export default cartRouter;
