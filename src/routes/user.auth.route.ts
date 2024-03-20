import { Router } from 'express';
import { validateUserEmailExistence, validateLoginUser, validateRegisterUser } from '../middlewares/user.validation';
import UserAuthController from '../controllers/user.auth.controller';

const userRouter = Router();

userRouter
  .post('/signup', validateRegisterUser, validateUserEmailExistence, UserAuthController.register);

userRouter
  .post('/login', validateLoginUser, UserAuthController.login);

export default userRouter;
