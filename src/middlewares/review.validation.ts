import { validateReqBody } from './req.body.validation';
import ReviewValidation from '../validations/review.validation';

export const validateCreateReview = validateReqBody(ReviewValidation.createReview);

export const validateUpdateReview = validateReqBody(ReviewValidation.updateReview);
