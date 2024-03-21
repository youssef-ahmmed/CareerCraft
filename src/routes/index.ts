import { Router } from 'express';
import authRoute from './user.auth.route';
import userRouter from './user.route';
import passwordRoute from './user.password.route';
import companyAuthRouter from './company.auth.route';
import companyPasswordRouter from './company.password.route';

const router = Router();

router.use('/users', authRoute);
router.use('/users', passwordRoute);
router.use('/users', userRouter);

router.use('/companies', companyAuthRouter);
router.use('/companies', companyPasswordRouter);

export default router;
