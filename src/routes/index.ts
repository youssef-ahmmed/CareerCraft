import { Router } from 'express';
import userAuthRouter from './user.auth.route';
import userRouter from './user.route';
import userPasswordRouter from './user.password.route';
import companyAuthRouter from './company.auth.route';
import companyPasswordRouter from './company.password.route';
import companyRouter from './company.route';
import jobRoute from "./job.route";
import skillRouter from './skill.route';
import reviewRouter from './review.route';

const router = Router();

router.use('/users', userAuthRouter);
router.use('/users', userPasswordRouter);
router.use('/users', userRouter);

router.use('/companies', companyAuthRouter);
router.use('/companies', companyPasswordRouter);
router.use('/companies', companyRouter);

router.use('/jobs', jobRoute);

router.use('/', skillRouter);

router.use('/reviews', reviewRouter);

export default router;
