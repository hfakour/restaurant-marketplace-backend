import { ReviewEntity } from '../entities/review.entity';

export abstract class IReviewRepository {
  abstract findById(id: string): Promise<ReviewEntity | null>;
  abstract findByRestaurant(restaurantId: string): Promise<ReviewEntity[]>;
  abstract findByFood(foodId: string): Promise<ReviewEntity[]>;
  abstract create(review: ReviewEntity): Promise<ReviewEntity>;
  abstract update(review: ReviewEntity): Promise<ReviewEntity>;
  abstract delete(id: string): Promise<void>;
}
