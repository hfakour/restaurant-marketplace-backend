// src/application/services/wishlist.service.ts

import { Injectable } from '@nestjs/common';
import { WishlistEntity } from 'src/domain/entities/wishlist.entity';
import { IWishlistRepository } from 'src/domain/repository/wishlist.repository.interface';

import { WishlistId, WishlistUserId } from 'src/domain/types/entity-types';

@Injectable()
export class WishlistService {
  constructor(private readonly wishlistRepo: IWishlistRepository) {}

  async findById(id: WishlistId): Promise<WishlistEntity | null> {
    // 🔍 Find a wishlist by its unique ID
    return this.wishlistRepo.findById(id);
  }

  async findByUserId(userId: WishlistUserId): Promise<WishlistEntity[]> {
    // 👤 Fetch all wishlists for a given user
    return this.wishlistRepo.findByUserId(userId);
  }

  async create(wishlist: WishlistEntity): Promise<void> {
    // 🆕 Create a new wishlist
    await this.wishlistRepo.create(wishlist);
  }

  async update(wishlist: WishlistEntity): Promise<void> {
    // 🔁 Update wishlist contents or metadata
    await this.wishlistRepo.update(wishlist);
  }

  async delete(id: WishlistId): Promise<void> {
    // ❌ Delete wishlist by its ID
    await this.wishlistRepo.delete(id);
  }

  async existsById(id: WishlistId): Promise<boolean> {
    // ✅ Check if a wishlist exists
    return this.wishlistRepo.existsById(id);
  }
}
