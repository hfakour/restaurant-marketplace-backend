import { FoodCategoryId, FoodId, FoodMenuId } from 'src/domain/types/entity-types';
import { FoodEntity } from '../entity/food.entity';

/**
 * Repository contract for Food entity (domain layer).
 */
export interface IFoodRepository {
  /**
   * Find a food by its unique ID.
   */
  findById(id: FoodId): Promise<FoodEntity | null>;

  /**
   * Find all foods by menu ID.
   */
  findByMenuId(menuId: FoodMenuId): Promise<FoodEntity[]>;

  /**
   * Find all foods by category ID.
   */
  findByCategoryId(categoryId: FoodCategoryId): Promise<FoodEntity[]>;

  /**
   * Create a new food item and return the saved entity.
   */
  create(food: FoodEntity): Promise<FoodEntity>;

  /**
   * Update an existing food item and return the updated entity.
   */
  update(food: FoodEntity): Promise<FoodEntity>;

  /**
   * Delete a food item by its ID.
   */
  delete(id: FoodId): Promise<void>;
}
