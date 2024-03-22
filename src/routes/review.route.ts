import { Router } from "express";
import { validateCreateReview } from "../middlewares/review.validation";
import { verifyToken } from "../middlewares/verify.token";
import { verifyUserExistance, verifyEntityExistance } from "../middlewares/verify.entity";
import ReviewController from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter
  .post('/',
    validateCreateReview,
    verifyToken,
    verifyUserExistance,
    ReviewController.createReview
  );

reviewRouter
  .get('/:reviewId',
    verifyToken,
    verifyEntityExistance,
    ReviewController.getReviewById
  );

reviewRouter
  .put('/:reviewId',
    verifyToken,
    verifyUserExistance,
    ReviewController.updateReviewById,
  );

reviewRouter
  .delete('/:reviewId',
    verifyToken,
    verifyUserExistance,
    ReviewController.deleteReviewById,
  );


export default reviewRouter;
