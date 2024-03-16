import IReview from "../../types/IReview";

class ReviewDto implements IReview {
  id: number;
  rating: number;
  content: string;
  userId: number;
  companyId: number;

  constructor(reviewObject: IReview) {
    this.id = reviewObject.id;
    this.rating = reviewObject.rating;
    this.content = reviewObject.content;
    this.userId = reviewObject.userId;
    this.companyId = reviewObject.companyId;
  }
}

export default ReviewDto;
