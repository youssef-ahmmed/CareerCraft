import { Router } from 'express';
import uploadImage from '../middlewares/upload.image';
import CompanyAuthController from '../controllers/company.auth.controller';
import {
  validateCompanyRegister,
  validateCompanyLogin,
  validateCompanyEmailExistence,
} from '../middlewares/company.validation';

const companyAuthRouter = Router();

companyAuthRouter
  .post('/signup',
    uploadImage.single('logo'),
    validateCompanyRegister,
    validateCompanyEmailExistence,
    CompanyAuthController.register);

companyAuthRouter
  .post('/login', validateCompanyLogin, CompanyAuthController.login);

export default companyAuthRouter;
