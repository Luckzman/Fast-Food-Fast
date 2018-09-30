import express from 'express';
import authCheck from '../utils/auth_checker';
import
{
  placeOrder,
  getAllOrder,
  getSingleOrder,
  updateOrderStatus,
} from '../controller/db_controller/order';

const orderRouter = express.Router();

orderRouter.post('/', authCheck, placeOrder);
orderRouter.get('/', authCheck, getAllOrder);
orderRouter.get('/:id', authCheck, getSingleOrder);
orderRouter.put('/:id', authCheck, updateOrderStatus);

export default orderRouter;
