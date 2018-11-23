import express from 'express';
import order from './order';
import auth from './auth';
import menu from './menu';
import user from './user';
import deliveryInfo from './delivery_info';

const router = express.Router();
router.use('/api/v1/orders', order);
router.use('/api/v1/auth', auth);
router.use('/api/v1/menu', menu);
router.use('/api/v1/user', user);
router.use('/api/v1/delivery_info', deliveryInfo);

export default router;
