import express from 'express';
import { signup, login } from '../database/controller/user';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;
