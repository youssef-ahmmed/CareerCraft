import joi from "joi";
import { Request } from "express";

class CompanyValidation {
  static createCompany(requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      name: joi.string().trim().min(3).required(),
      industry: joi.string().trim().min(3).required(),
      location: joi.string().trim().min(3).required(),
      logo: joi.string().trim().min(3).required(),
      description: joi.string().trim().min(10).required(),
      websiteLink: joi.string().trim().min(3).required(),
    });

    return schema.validate(requestBody);
  }

  static login(requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static forgetPassword(requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
    });

    return schema.validate(requestBody);
  }

  static resetPassword(requestBody: Request) {
    const schema = joi.object({
      password: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static changePassword(requestBody: Request) {
    const schema = joi.object({
      currentPassword: joi.string().min(6).required(),
      newPassword: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static updateCompany(requestBody: Request) {
    const schema = joi.object({
      id: joi.number().required(),
      email: joi.string().email(),
      password: joi.string().min(6),
      name: joi.string().trim().min(3),
      industry: joi.string().trim().min(3),
      location: joi.string().trim().min(3),
      logo: joi.string().trim().min(3),
      description: joi.string().trim().min(10),
      websiteLink: joi.string().trim().min(3),
    });

    return schema.validate(requestBody);
  }
}

export default CompanyValidation;
