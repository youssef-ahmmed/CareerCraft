import { validateEmailExistence, validateReqBody } from './req.body.validation';
import EntityValidation from '../validations/entity.validation';
import CompanyDao from '../models/dao/company.dao';

export const validateCompanyRegister = validateReqBody(EntityValidation.createCompany);

export const validateCompanyLogin = validateReqBody(EntityValidation.login);

export const validateCompanyEmailExistence = validateEmailExistence(CompanyDao.getCompanyByEmail);

export const validateUpdateCompanyById = validateReqBody(EntityValidation.updateCompany);
