import {Router} from 'express';

import PasswordController from "../controllers/password.controller";
import {
  changePasswordValidator,
  forgetPasswordValidation,
  resetPasswordValidation
} from "../middlewares/password.validation";
import {verifyToken} from "../middlewares/verify.token";

const passwordRoute = Router();

passwordRoute
  .put('/change-password', verifyToken, changePasswordValidator, PasswordController.changePassword);
passwordRoute
  .post('/forget-password', verifyToken, forgetPasswordValidation, PasswordController.forgetPassword);
passwordRoute
  .post('/reset-password/:userId/:token', verifyToken, resetPasswordValidation, PasswordController.resetPassword);

export default passwordRoute;
