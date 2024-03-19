import { Router } from 'express';
import authRoute from './user.auth.route';


const router = Router();

router.use('/users', authRoute);
export default router;
