import { ReviewEntity } from '../entities/review.entity';
export interface IReviewRepository {
  findById(id: string): Promise<ReviewEntity | null>;
  findByRestaurant(restaurantId: string): Promise<ReviewEntity[]>;
  findByFood(foodId: string): Promise<ReviewEntity[]>;
  create(review: ReviewEntity): Promise<void>;
  update(review: ReviewEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
