import UserValidation from "../validations/user.validation";
import { validateReqBody } from "./req.body.validation";

export const changePasswordValidator = validateReqBody(UserValidation.changePassword);

export const forgetPasswordValidation = validateReqBody(UserValidation.forgetPassword);

export const resetPasswordValidation = validateReqBody(UserValidation.resetPassword);
