import express from 'express';
import { signup, login } from '../controller/db_controller/auth';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;
