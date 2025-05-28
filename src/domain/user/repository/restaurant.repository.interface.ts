import { Restaurant } from '../entities/restaurant.entity';

export abstract class IRestaurantRepository {
  abstract findById(id: string): Promise<Restaurant | null>;
  abstract findByName(name: string): Promise<Restaurant | null>;
  abstract findAll(): Promise<Restaurant[]>;
  abstract create(restaurant: Restaurant): Promise<Restaurant>;
  abstract update(restaurant: Restaurant): Promise<Restaurant>;
  abstract delete(id: string): Promise<void>;
  abstract findByCategory(categoryId: string): Promise<Restaurant[]>;
  abstract existsByName(name: string): Promise<boolean>;
}
