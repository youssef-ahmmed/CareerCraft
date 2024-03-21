import { Router } from 'express';
import uploadImage from '../middlewares/upload.image';
import companyAuthController from '../controllers/company.auth.controller';
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
    companyAuthController.register);

companyAuthRouter
  .post('/login', validateCompanyLogin, companyAuthController.login);

export default companyAuthRouter;
