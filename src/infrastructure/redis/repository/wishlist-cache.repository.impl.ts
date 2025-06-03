// src/infrastructure/redis/repositories/wishlist-cache.repository.impl.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import {
  IWishlistCacheRepository,
  CachedWishlist,
} from 'src/domain/repository/wishlist-cache.repository';

import { WishlistUserId } from 'src/domain/types/entity-types';
import { WishlistEntity } from 'src/domain/entity/wishlist.entity';
import { WishlistCacheMapper } from 'src/domain/types/cache/wishlist/wishlist-cache.mapper';

@Injectable()
export class WishlistCacheRepository implements IWishlistCacheRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  /**
   * 🧠 Generate Redis cache key for a user's wishlist
   */
  private getCacheKey(userId: string): string {
    return `wishlist:${userId}`;
  }

  /**
   * 💾 Save raw cached wishlist array for a user
   */
  async save(userId: WishlistUserId, wishlists: CachedWishlist[], ttl = 3600): Promise<void> {
    const key = this.getCacheKey(userId);
    await this.cache.set(key, wishlists, ttl);
  }

  /**
   * 📥 Retrieve cached wishlist array for a user
   */
  async findByUserId(userId: WishlistUserId): Promise<CachedWishlist[] | null> {
    const key = this.getCacheKey(userId);
    const cached = await this.cache.get<CachedWishlist[]>(key);
    return cached ?? null;
  }

  /**
   * ❌ Remove cached wishlist data for a user
   */
  async delete(userId: WishlistUserId): Promise<void> {
    const key = this.getCacheKey(userId);
    await this.cache.del(key);
  }

  /**
   * ♻️ Convert domain entities to cache models and save
   */
  async saveFromEntities(
    userId: WishlistUserId,
    entities: WishlistEntity[],
    ttl = 3600,
  ): Promise<void> {
    const mapped: CachedWishlist[] = entities.map((w) => WishlistCacheMapper.toCacheModel(w));

    await this.save(userId, mapped, ttl);
  }

  /**
   * 🔁 Convert cache models to domain entities
   */
  async getAsEntities(userId: WishlistUserId): Promise<WishlistEntity[] | null> {
    const cached = await this.findByUserId(userId);
    return cached ? cached.map((item) => WishlistCacheMapper.fromCacheModel(item)) : null;
  }
}
