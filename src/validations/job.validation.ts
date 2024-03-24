import { Request } from "express";
import joi from "joi";

class JobValidation {
  private static readonly jobLocationOptions: string[] = ['REMOTE', 'OFFLINE', 'HYBRID'];
  private static readonly jobTypeOptions: string[] = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP'];

  static createJob (requestBody: Request) {
    const schema = joi.object({
      title: joi.string().trim().required(),
      description: joi.string().trim().min(10).required(),
      location: joi.string().trim().valid(...JobValidation.jobLocationOptions).required(),
      type: joi.string().trim().valid(...JobValidation.jobTypeOptions).required(),
      salary: joi.number().integer().required(),
      status: joi.boolean().default(true),
      applicationLink: joi.string().trim().uri().required(),
      applicantNumbers: joi.number().integer().required(),
      notificationId: joi.number().integer().optional(),
      skills: joi.array().items(joi.string().trim().required()).min(1).required(),
    });

    return schema.validate(requestBody);
  }

  static updateJob (requestBody: Request) {
    const schema = joi.object({
      title: joi.string().trim(),
      description: joi.string().trim().min(10),
      location: joi.string().trim().valid(...JobValidation.jobLocationOptions),
      type: joi.string().trim().valid(...JobValidation.jobTypeOptions),
      salary: joi.number().integer(),
      status: joi.boolean().default(true),
      applicationLink: joi.string().trim().uri(),
      applicantNumbers: joi.number().integer(),
      notificationId: joi.number().integer().optional(),
      skills: joi.array().items(joi.string().trim().required()).min(1),
    });

    return schema.validate(requestBody);
  }

  static getJobBySkills (requestBody: Request) {
    const schema = joi.object({
      skills: joi.array().items(joi.string().trim().required()).min(1).required(),
    });

    return schema.validate(requestBody);
  }
}

export default JobValidation;
