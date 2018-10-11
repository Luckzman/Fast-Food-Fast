import express from 'express';
import swaggerUi from 'swagger-ui-express';
import order from './order';
import auth from './auth';
import menu from './menu';
import user from './user';

const swaggerDoc = require('../../swagger.json');

const router = express.Router();
router.use('/api/v1/orders', order);
router.use('/api/v1/auth', auth);
router.use('/api/v1/menu', menu);
router.use('/api/v1/user', user);
router.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
