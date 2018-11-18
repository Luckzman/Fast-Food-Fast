import express from 'express';
import { signupValidator, loginValidator } from '../utils/validate';
import { signup, login } from '../controller/db_controller/auth';

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signup);
authRouter.post('/login', loginValidator, login);

export default authRouter;
