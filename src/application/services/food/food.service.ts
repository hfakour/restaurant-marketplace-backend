// src/application/services/food/food.service.ts

import { Injectable } from '@nestjs/common';
import { Food } from 'src/domain/entities/food.entity';
import { IFoodRepository } from 'src/domain/repository/food.repository.interface';

// 🧱 Domain Entity & Repository

// 🆔 Strongly typed IDs
import { FoodId, FoodMenuId, FoodCategoryId } from 'src/domain/types/entity-types';

@Injectable()
export class FoodService {
  // 💉 Inject repository interface (infrastructure will implement it)
  constructor(private readonly foodRepo: IFoodRepository) {}

  // 🔍 Find one food by ID
  async getById(id: FoodId): Promise<Food | null> {
    return this.foodRepo.findById(id);
  }

  // 📋 Find all foods by menu
  async getByMenuId(menuId: FoodMenuId): Promise<Food[]> {
    return this.foodRepo.findByMenuId(menuId);
  }

  // 📋 Find all foods in a category
  async getByCategoryId(categoryId: FoodCategoryId): Promise<Food[]> {
    return this.foodRepo.findByCategoryId(categoryId);
  }

  // ➕ Create a new food item
  async create(food: Food): Promise<void> {
    // ⚠️ Assumes food is already validated + fully constructed
    await this.foodRepo.save(food);
  }

  // ✏️ Update an existing food item
  async update(food: Food): Promise<void> {
    // ⚠️ Assumes food contains an existing valid ID
    await this.foodRepo.update(food);
  }

  // ❌ Delete a food item
  async delete(id: FoodId): Promise<void> {
    await this.foodRepo.delete(id);
  }
}
