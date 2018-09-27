import express from 'express';
import
{
  getAllOrder,
  getOrderItem,
  placeOrder,
  updateOrderStatus,
} from '../database/controller/order';

const orderRouter = express.Router();
orderRouter.get('/', getAllOrder);
orderRouter.get('/:id', getOrderItem);
orderRouter.post('/', placeOrder);
orderRouter.put('/:id', updateOrderStatus);

export default orderRouter;
