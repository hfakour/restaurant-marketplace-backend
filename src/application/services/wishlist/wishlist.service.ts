// src/application/services/wishlist/wishlist.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { WishlistEntity } from 'src/domain/entities/wishlist.entity';
import { IWishlistRepository } from 'src/domain/repository/wishlist.repository.interface';
import { IWishlistCacheRepository } from 'src/domain/repository/wishlist-cache.repository';

import { Food } from 'src/domain/entities/food.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';
import { User } from 'src/domain/entities/user.entity';

import { WishlistId, WishlistUserId } from 'src/domain/types/entity-types';
import { CreateWishlistDto } from './dtos/create-wishlist.dto';
import { UpdateWishlistDto } from './dtos/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepo: IWishlistRepository,
    private readonly wishlistCacheRepo: IWishlistCacheRepository, // ✅ Redis
    private readonly em: EntityManager, // ✅ PostgreSQL
  ) {}

  /**
   * 🔍 Find wishlist by ID from DB
   */
  async findById(id: WishlistId): Promise<WishlistEntity | null> {
    return this.wishlistRepo.findById(id);
  }

  /**
   * 🔍 Find all wishlists for a user
   *
   * @param userId - The user's ID
   * @param forceRefresh - If true, always fetch from DB and refresh cache
   */
  async findByUserId(userId: WishlistUserId, forceRefresh = false): Promise<WishlistEntity[]> {
    // 🧠 Use cache unless forced to refresh
    if (!forceRefresh) {
      const cached = await this.wishlistCacheRepo.getAsEntities(userId);
      if (cached) return cached;
    }

    // 🔁 Always get latest from DB
    const fromDb = await this.wishlistRepo.findByUserId(userId);

    // 💾 Update Redis cache
    await this.wishlistCacheRepo.saveFromEntities(userId, fromDb);
    return fromDb;
  }

  /**
   * ➕ Create wishlist, clear & repopulate cache
   */
  async create(userId: WishlistUserId, dto: CreateWishlistDto): Promise<void> {
    const wishlist = new WishlistEntity();
    wishlist.user = this.em.getReference(User, userId);
    wishlist.title = dto.title ?? undefined;

    if (dto.foodIds?.length) {
      const foodRefs = dto.foodIds.map((id) => this.em.getReference(Food, id));
      wishlist.foods.set(foodRefs);
    }

    if (dto.restaurantIds?.length) {
      const restaurantRefs = dto.restaurantIds.map((id) => this.em.getReference(Restaurant, id));
      wishlist.restaurants.set(restaurantRefs);
    }

    await this.wishlistRepo.create(wishlist);

    // 🧼 Refresh cache after creation
    const updated = await this.wishlistRepo.findByUserId(userId);
    await this.wishlistCacheRepo.saveFromEntities(userId, updated);
  }

  /**
   * ✏️ Update and refresh cache
   */
  async update(dto: UpdateWishlistDto): Promise<void> {
    const wishlist = await this.wishlistRepo.findById(dto.id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${dto.id} not found`);
    }

    wishlist.title = dto.title ?? wishlist.title;

    if (dto.foodIds) {
      const foodRefs = dto.foodIds.map((id) => this.em.getReference(Food, id));
      wishlist.foods.set(foodRefs);
    }

    if (dto.restaurantIds) {
      const restaurantRefs = dto.restaurantIds.map((id) => this.em.getReference(Restaurant, id));
      wishlist.restaurants.set(restaurantRefs);
    }

    await this.wishlistRepo.update(wishlist);

    // 🔄 Refresh cache
    const updated = await this.wishlistRepo.findByUserId(wishlist.user.id);
    await this.wishlistCacheRepo.saveFromEntities(wishlist.user.id, updated);
  }

  /**
   * ❌ Delete and clear cache
   */
  async delete(id: WishlistId): Promise<void> {
    const wishlist = await this.wishlistRepo.findById(id);
    if (!wishlist) return;

    await this.wishlistRepo.delete(id);
    await this.wishlistCacheRepo.delete(wishlist.user.id);
  }

  /**
   * ✅ Check if wishlist exists
   */
  async existsById(id: WishlistId): Promise<boolean> {
    return this.wishlistRepo.existsById(id);
  }
}
