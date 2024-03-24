import UserController from '../controllers/user.controller';
import uploadImage from '../middlewares/upload.image';
import { validateUpdateUserById } from '../middlewares/user.validation';
import { verifyToken } from '../middlewares/verify.token';
import { Router } from 'express';

const userRouter = Router();

userRouter
  .post('/jobs/:jobId', verifyToken, UserController.applyUserForJob);

userRouter
  .get('/:userId', verifyToken, UserController.getUserById)
  .get('/profile', verifyToken, UserController.getUserById);

userRouter
  .delete('/', verifyToken, UserController.deleteUserById);

userRouter
  .put('/', 
    uploadImage.single('photo'),
    verifyToken,
    validateUpdateUserById,
    UserController.updateUserById);

export default userRouter;
