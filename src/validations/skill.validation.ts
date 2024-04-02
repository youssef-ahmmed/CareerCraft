import joi from 'joi';
import { Request } from 'express';
import { ParsedQs } from 'qs';

class SkillValidation {
  static createSkill(requestBody: Request) {
    const schema = joi.object({
      skills: joi.array().items(joi.string().min(3).required()).min(1).required(),
    });

    return schema.validate(requestBody);
  }

  static getSkillsFromQueryParams (reqQuery: ParsedQs) {
    const schema = joi.object({
      skills: joi.string().required().min(2),
    });

    return schema.validate(reqQuery);
  }
}

export default SkillValidation;


