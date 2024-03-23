import { Router } from 'express';
import {
  validateUserEmailExistence,
  validateLoginUser,
  validateRegisterUser
} from '../middlewares/user.validation';
import userAuthController from '../controllers/user.auth.controller';
import uploadImage from '../middlewares/upload.image';

const userAuthRouter = Router();

userAuthRouter
  .post('/signup',
    uploadImage.single('photo'),
    validateRegisterUser,
    validateUserEmailExistence,
    userAuthController.register);

userAuthRouter
  .post('/login', validateLoginUser, userAuthController.login);

export default userAuthRouter;
