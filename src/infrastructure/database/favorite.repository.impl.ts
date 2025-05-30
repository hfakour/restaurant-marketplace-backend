// src/infrastructure/database/repositories/favorite.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repository/favorite.repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { Food } from 'src/domain/entities/food.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity, 'default')
    private readonly repo: EntityRepository<FavoriteEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 👤 Find all favorites for a user
  async findByUserId(userId: User['id']): Promise<FavoriteEntity[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // 🏪 Find all favorites for a specific restaurant
  async findByRestaurantId(restaurantId: Restaurant['id']): Promise<FavoriteEntity[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // 🍕 Find all favorites for a specific food item
  async findByFoodId(foodId: Food['id']): Promise<FavoriteEntity[]> {
    return this.repo.find({ food: { id: foodId } });
  }

  // ➕ Save new favorite
  async create(favorite: FavoriteEntity): Promise<void> {
    this.em.persist(favorite);
    await this.em.flush();
  }

  // ❌ Remove favorite by ID
  async delete(id: FavoriteEntity['id']): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }

  // 🔍 Internal: Fetch favorite by ID
  private async findById(id: FavoriteEntity['id']): Promise<FavoriteEntity | null> {
    return this.repo.findOne({ id });
  }
}
