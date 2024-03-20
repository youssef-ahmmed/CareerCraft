import joi from 'joi';
import { Request } from "express";

class UserValidation {
  static createUser (requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      firstName: joi.string().trim().min(3).required(),
      lastName: joi.string().trim().min(3).required(),
      photo: joi.string().trim(),
      bio: joi.string().min(5),
      resumeLink: joi.string().required(),
    });

    return schema.validate(requestBody);
  }

  static login (requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static forgetPassword (requestBody: Request) {
    const schema = joi.object({
      id: joi.number().required(),
      email: joi.string().email().required(),
      password: joi.string().min(6),
      firstName: joi.string().trim().min(3),
      lastName: joi.string().trim().min(3),
      photo: joi.string().trim(),
      bio: joi.string().min(5),
      resumeLink: joi.string(),
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
      newPassword: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static updateUser (requestBody: Request) {
    const schema = joi.object({
      id: joi.number().required(),
      email: joi.string().email(),
      password: joi.string().min(6),
      firstName: joi.string().trim().min(3),
      lastName: joi.string().trim().min(3),
      photo: joi.string().trim(),
      bio: joi.string().min(5),
      resumeLink: joi.string(),
    });

    return schema.validate(requestBody);
  }
}

export default UserValidation;
