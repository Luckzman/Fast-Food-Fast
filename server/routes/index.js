import express from 'express';
import order from './order';
import user from './user';
import menu from './menu';

const router = express.Router();
router.use('/api/v1/order', order);
router.use('/api/v1/auth', user);
router.use('/api/v1/menu', menu);

export default router;
