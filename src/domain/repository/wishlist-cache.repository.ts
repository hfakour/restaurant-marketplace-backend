// src/domain/repository/wishlist-cache.repository.ts

import { WishlistUserId } from 'src/domain/types/entity-types';
import { CachedWishlist } from '../types/cache/cache-types';
import { WishlistEntity } from '../entities/wishlist.entity';

export interface IWishlistCacheRepository {
  /**
   * 🧊 Get cached wishlist records
   */
  findByUserId(userId: WishlistUserId): Promise<CachedWishlist[] | null>;

  /**
   * 💾 Save raw cached wishlist data
   */
  save(userId: WishlistUserId, data: CachedWishlist[], ttl?: number): Promise<void>;

  /**
   * ❌ Delete cached wishlist data
   */
  delete(userId: WishlistUserId): Promise<void>;

  /**
   * 🧠 Convert cached data into domain entities
   */
  getAsEntities(userId: WishlistUserId): Promise<WishlistEntity[] | null>;

  /**
   * ♻️ Convert domain entities into cached data and store them
   */
  saveFromEntities(userId: WishlistUserId, entities: WishlistEntity[], ttl?: number): Promise<void>;
}

export { CachedWishlist };
