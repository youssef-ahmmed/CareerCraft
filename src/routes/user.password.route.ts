import { Router } from 'express';

import userPasswordController from "../controllers/user.password.controller";
import {
  forgetPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from '../middlewares/entity.password.validation';
import { verifyToken } from "../middlewares/verify.token";

const userPasswordRouter = Router();

userPasswordRouter
  .put('/change-password', verifyToken, changePasswordValidator, userPasswordController.changePassword);

userPasswordRouter
  .post('/forget-password', forgetPasswordValidator, userPasswordController.forgetPassword);

userPasswordRouter
  .post('/reset-password/:id/:token', resetPasswordValidator, userPasswordController.resetPassword);

export default userPasswordRouter;
