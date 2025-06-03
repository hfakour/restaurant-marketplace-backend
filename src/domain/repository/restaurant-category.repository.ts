import { RestaurantCategoryId } from 'src/domain/types/entity-types';
import { RestaurantCategoryEntity } from '../entity/restaurant-category.entity';

/**
 * Repository contract for RestaurantCategory entity (domain layer).
 */
export interface IRestaurantCategoryRepository {
  /**
   * Find a restaurant category by its unique ID.
   */
  findById(id: RestaurantCategoryId): Promise<RestaurantCategoryEntity | null>;

  /**
   * Retrieve all restaurant categories.
   */
  findAll(): Promise<RestaurantCategoryEntity[]>;

  /**
   * Create a new restaurant category and return the created entity.
   */
  create(category: RestaurantCategoryEntity): Promise<RestaurantCategoryEntity>;

  /**
   * Update an existing restaurant category and return the updated entity.
   */
  update(category: RestaurantCategoryEntity): Promise<RestaurantCategoryEntity>;

  /**
   * Delete a restaurant category by its ID.
   */
  delete(id: RestaurantCategoryId): Promise<void>;

  /**
   * Check if a restaurant category exists by its ID.
   */
  existsById(id: RestaurantCategoryId): Promise<boolean>;
}
