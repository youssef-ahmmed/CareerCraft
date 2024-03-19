import { Router } from 'express';

import { verifyToken } from "../utils/auth";
import PasswordController from "../controllers/password.controller";
import { changePasswordValidator } from "../middlewares/password.validation";

const passwordRoute = Router();

passwordRoute
  .put('/change-password', verifyToken, changePasswordValidator, PasswordController.changePassword);

export default passwordRoute;
