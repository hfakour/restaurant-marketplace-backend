import { RestaurantEntity } from '../entity/restaurant.entity';
import { RestaurantCategoryId, RestaurantId, RestaurantName } from 'src/domain/types/entity-types';

/**
 * Repository contract for Restaurant entity (domain layer).
 */
export interface IRestaurantRepository {
  /**
   * Find a restaurant by its unique ID.
   */
  findById(id: RestaurantId): Promise<RestaurantEntity | null>;

  /**
   * Find a restaurant by its unique name.
   */
  findByName(name: RestaurantName): Promise<RestaurantEntity | null>;

  /**
   * Retrieve all restaurants.
   */
  findAll(): Promise<RestaurantEntity[]>;

  /**
   * Create a new restaurant and return the created entity.
   */
  create(restaurant: RestaurantEntity): Promise<RestaurantEntity>;

  /**
   * Update an existing restaurant and return the updated entity.
   */
  update(restaurant: RestaurantEntity): Promise<RestaurantEntity>;

  /**
   * Delete a restaurant by its ID.
   */
  delete(id: RestaurantId): Promise<void>;

  /**
   * Find all restaurants by category.
   */
  findByCategory(categoryId: RestaurantCategoryId): Promise<RestaurantEntity[]>;

  /**
   * Check if a restaurant exists by its name.
   */
  existsByName(name: RestaurantName): Promise<boolean>;
}
