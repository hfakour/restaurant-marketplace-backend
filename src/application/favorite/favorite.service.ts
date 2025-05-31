// src/application/services/favorite.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { IFavoriteRepository } from 'src/domain/repository/favorite.repository.interface';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { User } from 'src/domain/entities/user.entity';
import { Food } from 'src/domain/entities/food.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

import {
  FavoriteId,
  FavoriteUserId,
  FavoriteRestaurantId,
  FavoriteFoodId,
} from 'src/domain/types/entity-types';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly repo: IFavoriteRepository,
    private readonly em: EntityManager, // 👈 Used for reference creation
  ) {}

  // ✅ Add a new favorite
  async create(data: {
    userId: FavoriteUserId;
    foodId?: FavoriteFoodId;
    restaurantId?: FavoriteRestaurantId;
    note?: string;
  }): Promise<void> {
    // ❌ Business rule: can't favorite both at once
    if (data.foodId && data.restaurantId) {
      throw new Error('You can favorite either a food or restaurant, not both.');
    }

    // ❌ Business rule: must favorite at least one type
    if (!data.foodId && !data.restaurantId) {
      throw new Error('You must specify either a food or a restaurant to favorite.');
    }

    const userRef = this.em.getReference(User, data.userId);

    const favorite = new FavoriteEntity();
    favorite.user = userRef;

    if (data.foodId) {
      favorite.food = this.em.getReference(Food, data.foodId);
    }

    if (data.restaurantId) {
      favorite.restaurant = this.em.getReference(Restaurant, data.restaurantId);
    }

    if (data.note) {
      favorite.note = data.note.trim();
    }

    await this.repo.create(favorite);
  }

  // ❌ Delete favorite by ID
  async delete(favoriteId: FavoriteId): Promise<void> {
    await this.repo.delete(favoriteId);
  }

  // 🔍 Get all favorites for a user
  async getByUserId(userId: FavoriteUserId): Promise<FavoriteEntity[]> {
    return this.repo.findByUserId(userId);
  }

  // 🔍 Get all users who favorited a restaurant (admin analytics)
  async getByRestaurantId(restaurantId: FavoriteRestaurantId): Promise<FavoriteEntity[]> {
    return this.repo.findByRestaurantId(restaurantId);
  }

  // 🔍 Get all users who favorited a food (e.g. pizza)
  async getByFoodId(foodId: FavoriteFoodId): Promise<FavoriteEntity[]> {
    return this.repo.findByFoodId(foodId);
  }
}
