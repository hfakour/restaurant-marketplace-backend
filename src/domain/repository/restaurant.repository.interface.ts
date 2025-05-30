import { Restaurant } from '../entities/restaurant.entity';
import { RestaurantCategoryId, RestaurantId, RestaurantName } from 'src/domain/types/entity-types';

export interface IRestaurantRepository {
  findById(id: RestaurantId): Promise<Restaurant | null>;
  findByName(name: RestaurantName): Promise<Restaurant | null>;
  findAll(): Promise<Restaurant[]>;
  create(restaurant: Restaurant): Promise<void>;
  update(restaurant: Restaurant): Promise<void>;
  delete(id: RestaurantId): Promise<void>;
  findByCategory(categoryId: RestaurantCategoryId): Promise<Restaurant[]>;
  existsByName(name: RestaurantName): Promise<boolean>;
}
