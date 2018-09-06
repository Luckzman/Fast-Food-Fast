import express from 'express';
import order from './order';

const router = express.Router();
router.use('/api/v1/order', order);

export default router;
