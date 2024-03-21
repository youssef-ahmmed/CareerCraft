import UserDao from '../models/dao/user.dao';
import { validateEmailExistence, validateReqBody } from "./req.body.validation";
import EntityValidation from "../validations/entity.validation";

export const validateRegisterUser = validateReqBody(EntityValidation.createUser);

export const validateLoginUser = validateReqBody(EntityValidation.login);

export const validateUserEmailExistence = validateEmailExistence(UserDao.getUserByEmail);

export const validateUpdateUserById = validateReqBody(UserValidation.updateUser);
