import { validateEmailExistence, validateReqBody } from './req.body.validation';
import CompanyValidation from '../validations/company.validation';
import CompanyDao from '../models/dao/company.dao';

export const validateCompanyRegister = validateReqBody(CompanyValidation.createCompany);

export const validateCompanyLogin = validateReqBody(CompanyValidation.login);

export const validateCompanyEmailExistence = validateEmailExistence(CompanyDao.getCompanyByEmail);

export const validateUpdateCompanyById = validateReqBody(CompanyValidation.updateCompany);
