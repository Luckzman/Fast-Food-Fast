import express from 'express';
import order from './order';
import user from './user';

const router = express.Router();
router.use('/api/v1/order', order);
router.use('/api/v1/auth', user);

export default router;
