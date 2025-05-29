import { Restaurant } from '../entities/restaurant.entity';

export interface IRestaurantRepository {
  findById(id: string): Promise<Restaurant | null>;
  findByName(name: string): Promise<Restaurant | null>;
  findAll(): Promise<Restaurant[]>;
  create(restaurant: Restaurant): Promise<void>;
  update(restaurant: Restaurant): Promise<void>;
  delete(id: string): Promise<void>;
  findByCategory(categoryId: string): Promise<Restaurant[]>;
  existsByName(name: string): Promise<boolean>;
}
