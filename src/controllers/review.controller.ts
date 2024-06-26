import ReviewDao from '../models/dao/review.dao';
import ReviewDto from '../models/dto/review.dto';
import CompanyDao from '../models/dao/company.dao';
import { Response } from 'express';
import IExtendedRequest from '../types/IExtendedRequest';

class ReviewController {
  static createReview = async (req: IExtendedRequest, res: Response) => {
    try {
      const reviewDto = new ReviewDto({ ...req.body, userId: req.id });

      const company = await CompanyDao.getCompanyById(reviewDto.companyId);
      if (!company) {
        return res.status(400).json({ message: 'Not found' });
      }

      const review = await ReviewDao.createReview(reviewDto);
      return res.status(201).json(review);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getReviewById = async (req: IExtendedRequest, res: Response) => {
    try {
      const reviewId: number = parseInt(req.params.reviewId, 10);

      const review = await ReviewDao.getReviewById(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Not Found' });
      }

      return res.status(200).json(review);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getReviewsByCompanyId = async (req: IExtendedRequest, res: Response) => {
    try {
      const companyId: number = parseInt(req.params.companyId, 10);
      const company = await CompanyDao.getCompanyById(companyId);
      if (!company) {
        return res.status(400).json({ message: 'Not found' });
      }

      const reviews = await ReviewDao.getReviewsByCompanyId(companyId);
      return res.status(200).json(reviews);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static updateReviewById = async (req: IExtendedRequest, res: Response) => {
    const userId: number = parseInt(req.id, 10);
    const reviewId: number = parseInt(req.params.reviewId, 10);

    try {
      const review = await ReviewDao.getReviewById(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Not found' });
      }

      if (userId !== review.userId) {
        return res.status(403).json({ message: 'Permission Denied' });
      }

      const { rating, content } = req.body;
      const reviewToBeUpdated = { rating, content };

      const updatedReview = await ReviewDao.updateReview(reviewId, reviewToBeUpdated);
      return res.status(200).send(updatedReview);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static deleteReviewById = async (req: IExtendedRequest, res: Response) => {
    const userId: number = parseInt(req.id, 10);
    const reviewId: number = parseInt(req.params.reviewId, 10);

    try {
      const review = await ReviewDao.getReviewById(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Not found' });
      }

      if (userId !== review.userId) {
        return res.status(403).json({ message: 'Permission Denied' });
      }

      await ReviewDao.deleteReviewById(reviewId);

      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ReviewController;
