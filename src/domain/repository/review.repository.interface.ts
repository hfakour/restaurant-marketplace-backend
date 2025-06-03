import { ReviewFoodId, ReviewId, ReviewRestaurantId } from 'src/domain/types/entity-types';
import { ReviewEntity } from '../entity/review.entity';

/**
 * Repository contract for Review entity (domain layer).
 */
export interface IReviewRepository {
  /**
   * Find a review by its unique ID.
   */
  findById(id: ReviewId): Promise<ReviewEntity | null>;

  /**
   * Find all reviews for a specific restaurant.
   */
  findByRestaurant(restaurantId: ReviewRestaurantId): Promise<ReviewEntity[]>;

  /**
   * Find all reviews for a specific food item.
   */
  findByFood(foodId: ReviewFoodId): Promise<ReviewEntity[]>;

  /**
   * Create a new review and return the created entity.
   */
  create(review: ReviewEntity): Promise<ReviewEntity>;

  /**
   * Update an existing review and return the updated entity.
   */
  update(review: ReviewEntity): Promise<ReviewEntity>;

  /**
   * Delete a review by its ID.
   */
  delete(id: ReviewId): Promise<void>;
}
