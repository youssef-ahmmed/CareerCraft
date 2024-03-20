import UserController from '../controllers/user.controller';
import { validateUpdateUserById } from '../middlewares/user.validation';
import { verifyToken } from '../middlewares/verify.token';
import { Router } from 'express';

const userRouter = Router();

userRouter
  .get('/:userId', verifyToken, UserController.getUserById);

userRouter
  .get('/profile', verifyToken, UserController.getUserById);

userRouter
  .delete('/', verifyToken, UserController.deleteUserById);

userRouter
  .put('/', 
    verifyToken,
    validateUpdateUserById,
    UserController.updateUserById);

export default userRouter;
