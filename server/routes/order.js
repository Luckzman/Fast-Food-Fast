import express from 'express';
import
{
  getAllOrder,
  getOrderItem,
  createOrder,
  updateOrder,
} from '../controller/order';

const orderRouter = express.Router();
orderRouter.get('/', getAllOrder);
orderRouter.get('/:id', getOrderItem);
orderRouter.post('/', createOrder);
orderRouter.put('/:id', updateOrder);

export default orderRouter;
