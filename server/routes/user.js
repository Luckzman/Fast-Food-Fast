import express from 'express';
import signup from '../database/controller/user';

const authRouter = express.Router();

authRouter.post('/signup', signup);

export default authRouter;
