import { Router } from 'express';
import companyAuthRouter from './company.auth.route';
import passwordRouter from './company.password.route';

const router = Router();

router.use('/companies', companyAuthRouter);

export default router;

