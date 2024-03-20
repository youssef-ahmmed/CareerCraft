import UserValidation from '../validations/user.validation';
import UserDao from '../models/dao/user.dao';
import { validateEmailExistence, validateReqBody } from "./req.body.validation";

export const validateRegisterUser = validateReqBody(UserValidation.createUser);

export const validateLoginUser = validateReqBody(UserValidation.login);

export const validateUserEmailExistence = validateEmailExistence(UserDao.getUserByEmail);
