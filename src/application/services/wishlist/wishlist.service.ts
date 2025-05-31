// src/application/services/wishlist/wishlist.service.ts

import { Injectable } from '@nestjs/common';
import { WishlistEntity } from 'src/domain/entities/wishlist.entity';
import { IWishlistRepository } from 'src/domain/repository/wishlist.repository.interface';
import { Food } from 'src/domain/entities/food.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

import { WishlistId, WishlistUserId } from 'src/domain/types/entity-types';
import { CreateWishlistDto } from './dtos/create-wishlist.dto';
import { UpdateWishlistDto } from './dtos/update-wishlist.dto';
import { EntityManager } from '@mikro-orm/core';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepo: IWishlistRepository,
    private readonly em: EntityManager,
  ) {}

  async findById(id: WishlistId): Promise<WishlistEntity | null> {
    return this.wishlistRepo.findById(id);
  }

  async findByUserId(userId: WishlistUserId): Promise<WishlistEntity[]> {
    return this.wishlistRepo.findByUserId(userId);
  }

  async create(userId: WishlistUserId, dto: CreateWishlistDto): Promise<void> {
    const wishlist = new WishlistEntity();
    wishlist.user = this.em.getReference(User, userId);
    wishlist.title = dto.title ?? undefined;
    wishlist.foods.set(dto.foodIds.map((id) => ({ id }) as Food));
    wishlist.restaurants.set(dto.restaurantIds.map((id) => ({ id }) as Restaurant));
    await this.wishlistRepo.create(wishlist);
  }

  async update(dto: UpdateWishlistDto): Promise<void> {
    const wishlist = await this.wishlistRepo.findById(dto.id);
    if (!wishlist) throw new Error('Wishlist not found');

    wishlist.title = dto.title ?? wishlist.title;
    if (dto.foodIds) wishlist.foods.set(dto.foodIds.map((id) => ({ id }) as Food));
    if (dto.restaurantIds)
      wishlist.restaurants.set(dto.restaurantIds.map((id) => ({ id }) as Restaurant));

    await this.wishlistRepo.update(wishlist);
  }

  async delete(id: WishlistId): Promise<void> {
    await this.wishlistRepo.delete(id);
  }

  async existsById(id: WishlistId): Promise<boolean> {
    return this.wishlistRepo.existsById(id);
  }
}
