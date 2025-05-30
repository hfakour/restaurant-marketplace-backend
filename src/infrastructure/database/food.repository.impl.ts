// src/infrastructure/database/repositories/food.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { Food } from 'src/domain/entities/food.entity';
import { IFoodRepository } from 'src/domain/repository/food.repository.interface';
import { MenuEntity } from 'src/domain/entities/menu.entity';
import { MenuCategoryEntity } from 'src/domain/entities/menu-category.entity';

@Injectable()
export class FoodRepository implements IFoodRepository {
  constructor(
    @InjectRepository(Food, 'default')
    private readonly repo: EntityRepository<Food>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a food item by ID
  async findById(id: Food['id']): Promise<Food | null> {
    return this.repo.findOne({ id });
  }

  // 🍽️ Get all foods for a specific menu
  async findByMenuId(menuId: MenuEntity['id']): Promise<Food[]> {
    return this.repo.find({ menu: { id: menuId } });
  }

  // 🧾 Get all foods in a category
  async findByCategoryId(categoryId: MenuCategoryEntity['id']): Promise<Food[]> {
    return this.repo.find({ menuCategory: { id: categoryId } });
  }

  // 💾 Save new food
  async save(food: Food): Promise<void> {
    this.em.persist(food);
    await this.em.flush();
  }

  // 🔄 Update food
  async update(food: Food): Promise<void> {
    this.em.persist(food);
    await this.em.flush();
  }

  // ❌ Delete food by ID
  async delete(id: Food['id']): Promise<void> {
    const food = await this.findById(id);
    if (food) {
      this.em.remove(food);
      await this.em.flush();
    }
  }
}
