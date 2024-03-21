import { Router } from 'express';
import companyPasswordController from '../controllers/company.password.controller';
import { verifyToken } from '../middlewares/verify.token';
import {
  forgetPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from '../middlewares/entity.password.validation';

const companyPasswordRouter = Router();

companyPasswordRouter
  .put('/change-password', verifyToken, changePasswordValidator, companyPasswordController.changePassword);

companyPasswordRouter
  .post('/forget-password', forgetPasswordValidator, companyPasswordController.forgetPassword);

companyPasswordRouter
  .post('/reset-password/:id/:token', resetPasswordValidator, companyPasswordController.resetPassword);

export default companyPasswordRouter;
