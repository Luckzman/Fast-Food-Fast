import express from 'express';
import authCheck from '../utils/auth_checker';
import { urlParamsChecker, updateOrderValidator } from '../utils/validate';
import
{
  placeOrder,
  getAllOrder,
  getSingleOrder,
  updateOrderStatus,
  updateOrderInfo,
} from '../controller/db_controller/order';

const orderRouter = express.Router();

orderRouter.post('/', authCheck, placeOrder);
orderRouter.get('/', authCheck, getAllOrder);
orderRouter.get('/:id', urlParamsChecker, authCheck, getSingleOrder);
orderRouter.put('/:id', urlParamsChecker, authCheck, updateOrderInfo);
orderRouter.put('/admin/:id', urlParamsChecker, updateOrderValidator, authCheck, updateOrderStatus);

export default orderRouter;
