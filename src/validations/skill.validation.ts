import joi from 'joi';
import { Request } from 'express';

class SkillValidation {
  static createSkill(requestBody: Request) {
    const schema = joi.object({
      skills: joi.array().items(joi.string().min(3).required()).required(),
    });

    return schema.validate(requestBody);
  }
}

export default SkillValidation;


