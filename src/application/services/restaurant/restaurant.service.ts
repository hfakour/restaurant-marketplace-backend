// src/application/services/restaurant.service.ts

import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/domain/entities/restaurant.entity';
import { IRestaurantRepository } from 'src/domain/repository/restaurant.repository.interface';

import { RestaurantId, RestaurantName, RestaurantCategoryId } from 'src/domain/types/entity-types';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepo: IRestaurantRepository) {}

  async findById(id: RestaurantId): Promise<Restaurant | null> {
    // 🔍 Get a single restaurant by its ID
    return this.restaurantRepo.findById(id);
  }

  async findByName(name: RestaurantName): Promise<Restaurant | null> {
    // 🔍 Get a restaurant by its name
    return this.restaurantRepo.findByName(name);
  }

  async findAll(): Promise<Restaurant[]> {
    // 📦 Get all restaurants
    return this.restaurantRepo.findAll();
  }

  async findByCategory(categoryId: RestaurantCategoryId): Promise<Restaurant[]> {
    // 🗂️ Get all restaurants under a specific category
    return this.restaurantRepo.findByCategory(categoryId);
  }

  async create(restaurant: Restaurant): Promise<void> {
    // 🆕 Add a new restaurant
    await this.restaurantRepo.create(restaurant);
  }

  async update(restaurant: Restaurant): Promise<void> {
    // 🔁 Update existing restaurant details
    await this.restaurantRepo.update(restaurant);
  }

  async delete(id: RestaurantId): Promise<void> {
    // ❌ Remove a restaurant
    await this.restaurantRepo.delete(id);
  }

  async existsByName(name: RestaurantName): Promise<boolean> {
    // ✅ Check if restaurant with the same name exists
    return this.restaurantRepo.existsByName(name);
  }
}
