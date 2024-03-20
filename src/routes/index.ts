import { Router } from 'express';
import authRoute from './user.auth.route';
import passwordRoute from "./password.route";


const router = Router();

router.use('/users', authRoute);
router.use('/users', passwordRoute);

export default router;
