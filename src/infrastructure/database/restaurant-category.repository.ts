import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { RestaurantCategoryEntity } from 'src/domain/entities/restaurant-category.entity';
import { IRestaurantCategoryRepository } from 'src/domain/repository/restaurant-category.repository';
import { RestaurantCategoryId } from 'src/domain/types/entity-types';

@Injectable()
export class RestaurantCategoryRepository implements IRestaurantCategoryRepository {
  constructor(
    @InjectRepository(RestaurantCategoryEntity)
    private readonly repo: EntityRepository<RestaurantCategoryEntity>, // ✅ Correct repository type
    private readonly em: EntityManager, // 🧠 Needed for flush if necessary
  ) {}

  // 🔍 Find by ID
  async findById(id: RestaurantCategoryId): Promise<RestaurantCategoryEntity | null> {
    return await this.repo.findOne({ id });
  }

  // 📋 Find all
  async findAll(): Promise<RestaurantCategoryEntity[]> {
    return await this.repo.findAll();
  }

  // ➕ Create a new entity
  async create(category: RestaurantCategoryEntity): Promise<void> {
    this.em.persist(category);
    await this.em.flush(); // ✅ flush() now comes from the EntityManager
  }

  // 🔁 Update existing entity (must be managed)
  async update(category: RestaurantCategoryEntity): Promise<void> {
    this.em.persist(category);
    await this.em.flush(); // Just flush the context
  }

  // ❌ Delete by ID
  async delete(id: RestaurantCategoryId): Promise<void> {
    const category = await this.findById(id);
    if (category) {
      this.em.remove(category);
      await this.em.flush();
    }
  }
  // 🔎 Existence check
  async existsById(id: RestaurantCategoryId): Promise<boolean> {
    return (await this.repo.count({ id })) > 0;
  }
}
