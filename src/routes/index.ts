import { Router } from 'express';
import authRoute from './user.auth.route';
import passwordRoute from './password.route';
import companyAuthRouter from './company.auth.route';
import companyPasswordRouter from './company.password.route';

const router = Router();

router.use('/users', authRoute);
router.use('/users', passwordRoute);

router.use('/companies', companyAuthRouter);
router.use('/companies', companyPasswordRouter);

export default router;
