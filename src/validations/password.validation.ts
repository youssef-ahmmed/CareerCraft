import {Request} from "express";
import joi from "joi";


class PasswordValidation {
  static forgetPassword (requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
    });

    return schema.validate(requestBody);
  }

  static changePassword (requestBody: Request) {
    const schema = joi.object({
      currentPassword: joi.string().min(6).required(),
      newPassword: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static resetPassword (requestBody: Request) {
    const schema = joi.object({
      password: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }
}

export default PasswordValidation;
