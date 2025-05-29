import { Food } from '../entities/food.entity';

export interface IFoodRepository {
  findById(id: string): Promise<Food | null>;
  findByMenuId(menuId: string): Promise<Food[]>;
  findByCategoryId(categoryId: string): Promise<Food[]>;
  save(food: Food): Promise<void>;
  update(food: Food): Promise<void>;
  delete(id: string): Promise<void>;
}
