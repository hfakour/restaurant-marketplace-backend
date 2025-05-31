// src/domain/repository/restaurant-category.repository.ts

import { RestaurantCategoryId } from 'src/domain/types/entity-types';
import { RestaurantCategoryEntity } from '../entities/restaurant-category.entity';

export interface IRestaurantCategoryRepository {
  findById(id: RestaurantCategoryId): Promise<RestaurantCategoryEntity | null>;
  findAll(): Promise<RestaurantCategoryEntity[]>;
  create(category: RestaurantCategoryEntity): Promise<void>;
  update(category: RestaurantCategoryEntity): Promise<void>;
  delete(id: RestaurantCategoryId): Promise<void>;
  existsById(id: RestaurantCategoryId): Promise<boolean>;
}
