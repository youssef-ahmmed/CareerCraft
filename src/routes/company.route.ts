import CompanyController from '../controllers/company.controller';
import ReviewController from '../controllers/review.controller';
import { validateUpdateCompanyById } from '../middlewares/company.validation';
import { verifyEntityExistance } from "../middlewares/verify.entity";
import uploadImage from '../middlewares/upload.image';
import { verifyToken } from '../middlewares/verify.token';
import { Router } from 'express';

const companyRouter = Router();

companyRouter
  .get('/:companyId', verifyToken, CompanyController.getCompanyById);

companyRouter
  .get('/profile', verifyToken, CompanyController.getCompanyById);

companyRouter
  .delete('/profile', verifyToken, CompanyController.deleteCompanyById);

companyRouter
  .put('/profile', 
    uploadImage.single('logo'),
    verifyToken,
    validateUpdateCompanyById,
    CompanyController.updateCompanyById
  );

companyRouter
  .get('/:companyId/reviews',
    verifyToken,
    verifyEntityExistance,
    ReviewController.getReviewsByCompanyId
  );

companyRouter
  .get('/:companyId/jobs',
    verifyToken,
    verifyEntityExistance,
    CompanyController.getJobsByCompanyId
  );

export default companyRouter;
