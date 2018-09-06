import express from 'express';
import order from './order';

const router = express.Router();
router.use('api/v1', order);

export default router;
