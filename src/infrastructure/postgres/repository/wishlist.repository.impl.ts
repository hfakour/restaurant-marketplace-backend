// src/infrastructure/database/repositories/wishlist.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { WishlistEntity } from 'src/domain/entity/wishlist.entity';
import { IWishlistRepository } from 'src/domain/repository/wishlist.repository.interface';
import { UserId, WishlistId } from 'src/domain/types/entity-types';

@Injectable()
export class WishlistRepository implements IWishlistRepository {
  constructor(
    @InjectRepository(WishlistEntity, 'default')
    private readonly wishlistRepo: EntityRepository<WishlistEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find wishlist item by ID
  async findById(id: WishlistId): Promise<WishlistEntity | null> {
    return await this.wishlistRepo.findOne({ id });
  }

  // 🔍 Get all wishlist items for a specific user
  async findByUserId(userId: UserId): Promise<WishlistEntity[]> {
    return await this.wishlistRepo.find({ user: { id: userId } });
  }

  // ➕ Add wishlist entry
  async create(wishlist: WishlistEntity): Promise<void> {
    this.em.persist(wishlist);
    await this.em.flush();
  }

  // 🔄 Update wishlist entry
  async update(wishlist: WishlistEntity): Promise<void> {
    this.em.persist(wishlist);
    await this.em.flush();
  }

  // ❌ Delete wishlist entry by ID
  async delete(id: WishlistId): Promise<void> {
    const wishlist = await this.findById(id);
    if (wishlist) {
      this.em.remove(wishlist);
      await this.em.flush();
    }
  }

  // ✅ Check if wishlist item exists by ID
  async existsById(id: WishlistId): Promise<boolean> {
    const count = await this.wishlistRepo.count({ id });
    return count > 0;
  }
}
