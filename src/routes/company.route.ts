import CompanyController from '../controllers/company.controller';
import { validateUpdateCompanyById } from '../middlewares/company.validation';
import uploadImage from '../middlewares/upload.image';
import { verifyToken } from '../middlewares/verify.token';
import { Router } from 'express';

const companyRouter = Router();

companyRouter
  .get('/:companyId', verifyToken, CompanyController.getCompanyById);

companyRouter
  .get('/profile', verifyToken, CompanyController.getCompanyById);

companyRouter
  .delete('/', verifyToken, CompanyController.deleteCompanyById);

companyRouter
  .put('/', 
    uploadImage.single('logo'),
    verifyToken,
    validateUpdateCompanyById,
    CompanyController.updateCompanyById);

export default companyRouter;