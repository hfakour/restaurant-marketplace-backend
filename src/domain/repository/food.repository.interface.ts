import { FoodCategoryId, FoodId, FoodMenuId } from 'src/domain/types/entity-types';
import { Food } from '../entities/food.entity';

export interface IFoodRepository {
  findById(id: FoodId): Promise<Food | null>;
  findByMenuId(menuId: FoodMenuId): Promise<Food[]>;
  findByCategoryId(categoryId: FoodCategoryId): Promise<Food[]>;
  save(food: Food): Promise<void>;
  update(food: Food): Promise<void>;
  delete(id: FoodId): Promise<void>;
}
