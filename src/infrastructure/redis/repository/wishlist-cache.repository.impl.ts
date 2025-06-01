// src/infrastructure/redis/repositories/wishlist-cache.repository.impl.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import {
  IWishlistCacheRepository,
  CachedWishlist,
} from 'src/domain/repository/wishlist-cache.repository';

import { WishlistUserId } from 'src/domain/types/entity-types';

@Injectable()
export class WishlistCacheRepository implements IWishlistCacheRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  // 🧠 Generate Redis cache key for a user's wishlist
  private getCacheKey(userId: string): string {
    return `wishlist:${userId}`;
  }

  // 📤 Save cached wishlist array for a user
  async save(userId: WishlistUserId, wishlists: CachedWishlist[], ttl = 3600): Promise<void> {
    const key = this.getCacheKey(userId);
    await this.cache.set(key, wishlists, ttl); // ✅ TTL as number
  }

  // 📥 Retrieve cached wishlists for a user
  async findByUserId(userId: WishlistUserId): Promise<CachedWishlist[] | null> {
    const key = this.getCacheKey(userId);
    const cached = await this.cache.get<CachedWishlist[]>(key);
    return cached ?? null;
  }

  // ❌ Remove cached wishlist data for a user
  async delete(userId: WishlistUserId): Promise<void> {
    const key = this.getCacheKey(userId);
    await this.cache.del(key);
  }
}
