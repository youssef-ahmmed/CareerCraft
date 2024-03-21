import PasswordValidation from "../validations/password.validation";
import { validateReqBody } from "./req.body.validation";

export const changePasswordValidator = validateReqBody(PasswordValidation.changePassword);

export const forgetPasswordValidator = validateReqBody(PasswordValidation.forgetPassword);

export const resetPasswordValidator = validateReqBody(PasswordValidation.resetPassword);
