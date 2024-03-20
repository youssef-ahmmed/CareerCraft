import { Router } from 'express';
import PasswordController from '../controllers/company.password.controller';
import { verifyToken } from '../middlewares/verifyToken';
import {
  forgetPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} from '../middlewares/company.password.validation';

const companyPasswordRouter = Router();

companyPasswordRouter
  .post('/forget-password', forgetPasswordValidation, PasswordController.forgetPassword);

companyPasswordRouter
  .post('/reset-password/:id/:token', resetPasswordValidation, PasswordController.resetPassword);

companyPasswordRouter
  .put('/change-password', verifyToken, changePasswordValidation, PasswordController.changePassword);

export default companyPasswordRouter;
