import joi from 'joi';
import { Request } from 'express';

class ReviewValidation {
  static createReview = (requestBody: Request) => {
    const schema = joi.object({
      companyId: joi.number().required(),
      rating: joi.number().min(1).max(5).required(),
      content: joi.string().min(10).required(),
    });

    return schema.validate(requestBody);
  }

  static updateReview = (requestBody: Request) => {
    const schema = joi.object({
      rating: joi.number().min(1).max(5),
      content: joi.string().min(10),
    });

    return schema.validate(requestBody);
  }
}

export default ReviewValidation;
