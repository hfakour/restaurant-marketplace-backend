// src/infrastructure/database/repositories/favorite.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { FavoriteEntity } from 'src/domain/entity/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repository/favorite.repository.interface';
import { FavoriteId, FoodId, RestaurantId, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity, 'default')
    private readonly repo: EntityRepository<FavoriteEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 👤 Find all favorites for a user
  async findByUserId(userId: UserId): Promise<FavoriteEntity[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // 🏪 Find all favorites for a specific restaurant
  async findByRestaurantId(restaurantId: RestaurantId): Promise<FavoriteEntity[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // 🍕 Find all favorites for a specific food item
  async findByFoodId(foodId: FoodId): Promise<FavoriteEntity[]> {
    return this.repo.find({ food: { id: foodId } });
  }

  // ➕ Save new favorite
  async create(favorite: FavoriteEntity): Promise<void> {
    this.em.persist(favorite);
    await this.em.flush();
  }

  // ❌ Remove favorite by ID
  async delete(id: FavoriteId): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }

  // 🔍 Internal: Fetch favorite by ID
  private async findById(id: FavoriteId): Promise<FavoriteEntity | null> {
    return this.repo.findOne({ id });
  }
}
