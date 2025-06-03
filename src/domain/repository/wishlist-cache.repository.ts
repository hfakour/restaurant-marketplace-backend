import { WishlistUserId } from 'src/domain/types/entity-types';
import { CachedWishlist } from '../types/cache/cache-types';
import { WishlistEntity } from '../entity/wishlist.entity';

/**
 * Repository contract for Wishlist caching (domain layer).
 * Supports both raw cache DTOs and full hydrated entity flows.
 */
export interface IWishlistCacheRepository {
  /**
   * Retrieve cached wishlists (as DTO/serialized format) for a user.
   * @returns Array of CachedWishlist, or null if not cached.
   */
  findByUserId(userId: WishlistUserId): Promise<CachedWishlist[] | null>;

  /**
   * Save wishlists to the cache (in DTO/serialized format).
   * @param userId - User's ID.
   * @param data - Array of CachedWishlist.
   * @param ttl - Optional time-to-live (in seconds).
   */
  save(userId: WishlistUserId, data: CachedWishlist[], ttl?: number): Promise<void>;

  /**
   * Delete all cached wishlists for a user.
   */
  delete(userId: WishlistUserId): Promise<void>;

  /**
   * Retrieve cached wishlists as hydrated entities (ready for business logic).
   * @returns Array of WishlistEntity, or null if not cached.
   */
  getAsEntities(userId: WishlistUserId): Promise<WishlistEntity[] | null>;

  /**
   * Save wishlists to cache using hydrated entities (will serialize internally).
   * @param userId - User's ID.
   * @param entities - Array of WishlistEntity.
   * @param ttl - Optional time-to-live (in seconds).
   */
  saveFromEntities(userId: WishlistUserId, entities: WishlistEntity[], ttl?: number): Promise<void>;
}

export { CachedWishlist };
