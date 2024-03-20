import { Router } from 'express';
import {
  validateUserEmailExistence,
  validateLoginUser,
  validateRegisterUser
} from '../middlewares/user.validation';
import UserAuthController from '../controllers/user.auth.controller';
import uploadImage from '../middlewares/upload.image';

const userRouter = Router();

userRouter
  .post('/signup',
    uploadImage.single('photo'),
    validateRegisterUser,
    validateUserEmailExistence,
    UserAuthController.register);

userRouter
  .post('/login', validateLoginUser, UserAuthController.login);

export default userRouter;
