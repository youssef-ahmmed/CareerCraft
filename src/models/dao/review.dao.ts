import prisma from './client.db';
import IReview from "../../types/IReview";

class ReviewDao {
  static async createReview(reviewDto: IReview) {
    return prisma.reviews.create({
      data: reviewDto,
    });
  }

  static async updateReview(reviewId: number, objectToBeUpdated: object) {
    return prisma.reviews.update({
      where: { id: reviewId },
      data: objectToBeUpdated
    });
  }

  static async getReviewById(reviewId: number) {
    return prisma.reviews.findUnique({
      where: { id: reviewId },
    });
  }

  static async getReviewsByCompanyId(companyId: number) {
    return prisma.reviews.findMany({
      where: {
        companyId: companyId,
      }
    });
  }

  static async deleteReviewById(reviewId: number) {
    return prisma.reviews.delete({
      where: { id: reviewId },
    });
  }
}

export default ReviewDao;
