import IReview from "../../types/IReview";

class ReviewDto implements IReview {
  userId: number;
  companyId: number; 
  rating: number;
  content: string;

  constructor(reviewObject: IReview) {
    this.userId = reviewObject.userId;
    this.companyId = reviewObject.companyId;
    this.rating = reviewObject.rating;
    this.content = reviewObject.content;
  }
}

export default ReviewDto;
