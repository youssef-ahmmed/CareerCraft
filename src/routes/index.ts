import { Router } from 'express';
import companyAuthRouter from './company.auth.route';
import companyPasswordRouter from './company.password.route';

const router = Router();

router.use('/companies', companyAuthRouter);
router.use('/companies', companyPasswordRouter);

export default router;

