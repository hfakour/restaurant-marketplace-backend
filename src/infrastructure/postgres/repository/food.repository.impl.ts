// src/infrastructure/database/repositories/food.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { FoodEntity } from 'src/domain/entity/food.entity';
import { IFoodRepository } from 'src/domain/repository/food.repository.interface';
import { MenuEntity } from 'src/domain/entity/menu.entity';
import { FoodId, MenuCategoryId } from 'src/domain/types/entity-types';

@Injectable()
export class FoodRepository implements IFoodRepository {
  constructor(
    @InjectRepository(FoodEntity, 'default')
    private readonly repo: EntityRepository<FoodEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a food item by ID
  async findById(id: FoodEntity['id']): Promise<FoodEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🍽️ Get all foods for a specific menu
  async findByMenuId(menuId: MenuEntity['id']): Promise<FoodEntity[]> {
    return this.repo.find({ menu: { id: menuId } });
  }

  // 🧾 Get all foods in a category
  async findByCategoryId(categoryId: MenuCategoryId): Promise<FoodEntity[]> {
    return this.repo.find({ menuCategory: { id: categoryId } });
  }

  // 💾 Save new food
  async save(food: FoodEntity): Promise<void> {
    this.em.persist(food);
    await this.em.flush();
  }

  // 🔄 Update food
  async update(food: FoodEntity): Promise<void> {
    this.em.persist(food);
    await this.em.flush();
  }

  // ❌ Delete food by ID
  async delete(id: FoodId): Promise<void> {
    const food = await this.findById(id);
    if (food) {
      this.em.remove(food);
      await this.em.flush();
    }
  }
}
