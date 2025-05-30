import { ReviewFoodId, ReviewId, ReviewRestaurantId } from 'src/domain/types/entity-ids';
import { ReviewEntity } from '../entities/review.entity';

export interface IReviewRepository {
  findById(id: ReviewId): Promise<ReviewEntity | null>;
  findByRestaurant(restaurantId: ReviewRestaurantId): Promise<ReviewEntity[]>;
  findByFood(foodId: ReviewFoodId): Promise<ReviewEntity[]>;
  create(review: ReviewEntity): Promise<void>;
  update(review: ReviewEntity): Promise<void>;
  delete(id: ReviewId): Promise<void>;
}
