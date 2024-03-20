import CompanyValidation from '../validations/company.validation';
import { validateReqBody } from './req.body.validation';

export const forgetPasswordValidation = validateReqBody(CompanyValidation.forgetPassword);

export const resetPasswordValidation = validateReqBody(CompanyValidation.resetPassword);

export const changePasswordValidation = validateReqBody(CompanyValidation.changePassword);

