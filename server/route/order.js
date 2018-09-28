import express from 'express';
import { authCheck } from '../database/middleware/helpers';
import
{
  getAllOrder,
  getOrderItem,
  placeOrder,
  updateOrderStatus,
} from '../database/controller/order';

const orderRouter = express.Router();

orderRouter.post('/', authCheck, placeOrder);
orderRouter.get('/', authCheck, getAllOrder);
orderRouter.get('/:id', authCheck, getOrderItem);
orderRouter.put('/:id', authCheck, updateOrderStatus);

export default orderRouter;
