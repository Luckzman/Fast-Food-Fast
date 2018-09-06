import express from 'express';
import order from '../controller/order';

const orderRouter = express.Router();
orderRouter.get('/', order.getAllOrder);
orderRouter.get('/:id', order.getOrderItem);
orderRouter.post('/', order.createOrder);
orderRouter.put('/:id', order.updateOrder);

export default orderRouter;
