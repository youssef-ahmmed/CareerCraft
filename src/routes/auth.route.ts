import { Router } from 'express';
import { validateEmailExistence, validateLoginUser, validateRegisterUser } from '../middlewares/auth.validation';
import AuthController from '../controllers/auth.controller';

const userRouter = Router();

userRouter
  .post('/signup', validateRegisterUser, validateEmailExistence, AuthController.register);

userRouter
  .post('/login', validateLoginUser, AuthController.login);

export default userRouter;
