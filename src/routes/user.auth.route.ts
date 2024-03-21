import { Router } from 'express';
import {
  validateUserEmailExistence,
  validateLoginUser,
  validateRegisterUser
} from '../middlewares/user.validation';
import userAuthController from '../controllers/user.auth.controller';
import uploadImage from '../middlewares/upload.image';

const userRouter = Router();

userRouter
  .post('/signup',
    uploadImage.single('photo'),
    validateRegisterUser,
    validateUserEmailExistence,
    userAuthController.register);

userRouter
  .post('/login', validateLoginUser, userAuthController.login);

export default userRouter;
