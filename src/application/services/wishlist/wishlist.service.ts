// src/application/services/wishlist/wishlist.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { WishlistEntity } from 'src/domain/entities/wishlist.entity';
import { IWishlistRepository } from 'src/domain/repository/wishlist.repository.interface';
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
    private readonly em: EntityManager, // PostgreSQL ORM
  ) {}

  /**
   * 🔍 Find wishlist by its unique ID
   */
  async findById(id: WishlistId): Promise<WishlistEntity | null> {
    return this.wishlistRepo.findById(id);
  }

  /**
   * 🔍 Find all wishlists belonging to a specific user
   */
  async findByUserId(userId: WishlistUserId): Promise<WishlistEntity[]> {
    return this.wishlistRepo.findByUserId(userId);
  }

  /**
   * ➕ Create a new wishlist for a user
   */
  async create(userId: WishlistUserId, dto: CreateWishlistDto): Promise<void> {
    const wishlist = new WishlistEntity();

    // 🔗 Set relations using references (efficient in MikroORM)
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
  }

  /**
   * ✏️ Update an existing wishlist's details
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
  }

  /**
   * ❌ Delete a wishlist by ID
   */
  async delete(id: WishlistId): Promise<void> {
    await this.wishlistRepo.delete(id);
  }

  /**
   * ✅ Check if a wishlist exists by ID
   */
  async existsById(id: WishlistId): Promise<boolean> {
    return this.wishlistRepo.existsById(id);
  }
}
