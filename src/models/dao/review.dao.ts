import prisma from './client.db';
import IReview from "../../types/IReview";

class ReviewDao {
  static async createReview(reviewDto: any) {
    return prisma.reviews.create({
      data: reviewDto,
    });
  }

  static async updateReview(reviewDto: IReview) {
    return prisma.reviews.update({
      where: { id: reviewDto.id },
      data: reviewDto
    });
  }

  static async getReviewById(reviewDto: IReview) {
    return prisma.reviews.findUnique({
      where: { id: reviewDto.id },
    });
  }

  static async getReviewsByCompanyId(reviewDto: IReview) {
    return prisma.reviews.findMany({
      where: {
        companyId: reviewDto.companyId,
      }
    });
  }

  static async deleteReviewById(reviewDto: IReview) {
    return prisma.reviews.delete({
      where: { id: reviewDto.id },
    });
  }
}

export default ReviewDao;
