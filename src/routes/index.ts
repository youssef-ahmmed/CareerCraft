import { Router } from 'express';
import userAuthRouter from './user.auth.route';
import userRouter from './user.route';
import userPasswordRouter from './user.password.route';
import companyAuthRouter from './company.auth.route';
import companyPasswordRouter from './company.password.route';
import companyRouter from './company.route';

const router = Router();

router.use('/users', userAuthRouter);
router.use('/users', userPasswordRouter);
router.use('/users', userRouter);

router.use('/companies', companyAuthRouter);
router.use('/companies', companyPasswordRouter);
router.use('/companies', companyRouter);

export default router;
