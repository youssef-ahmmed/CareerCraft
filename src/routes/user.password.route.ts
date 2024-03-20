import {Router} from 'express';

import PasswordController from "../controllers/user.password.controller";
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
  .post('/forget-password', forgetPasswordValidation, PasswordController.forgetPassword);

passwordRoute
  .post('/reset-password/:id/:token', resetPasswordValidation, PasswordController.resetPassword);

export default passwordRoute;
