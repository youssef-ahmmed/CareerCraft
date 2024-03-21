import { Router } from 'express';

import userPasswordController from "../controllers/user.password.controller";
import {
  forgetPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from '../middlewares/entity.password.validation';
import { verifyToken } from "../middlewares/verify.token";

const passwordRoute = Router();

passwordRoute
  .put('/change-password', verifyToken, changePasswordValidator, userPasswordController.changePassword);

passwordRoute
  .post('/forget-password', forgetPasswordValidator, userPasswordController.forgetPassword);

passwordRoute
  .post('/reset-password/:id/:token', resetPasswordValidator, userPasswordController.resetPassword);

export default passwordRoute;
