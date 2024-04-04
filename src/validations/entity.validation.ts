import {Request} from "express";
import joi from "joi";


class EntityValidation {
  static login (requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static createUser (requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      firstName: joi.string().trim().min(3).required(),
      lastName: joi.string().trim().min(3).required(),
      photo: joi.string().trim(),
      bio: joi.string().min(5),
      resumeLink: joi.string().uri().required(),
      skills: joi.array().items(joi.string().trim().required()).min(1).required(),
    });

    return schema.validate(requestBody);
  }

  static updateUser (requestBody: Request) {
    const schema = joi.object({
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

  static createCompany(requestBody: Request) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      name: joi.string().trim().min(3).required(),
      industry: joi.string().trim().min(3).required(),
      location: joi.string().trim().min(3).required(),
      logo: joi.string().trim().min(3).required(),
      description: joi.string().trim().min(10).required(),
      websiteLink: joi.string().uri().trim().min(3).required(),
    });

    return schema.validate(requestBody);
  }

  static updateCompany(requestBody: Request) {
    const schema = joi.object({
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

export default EntityValidation;
