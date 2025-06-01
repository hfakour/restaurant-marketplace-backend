// src/domain/repository/wishlist-cache.repository.ts

import { WishlistUserId } from 'src/domain/types/entity-types';
import { CachedWishlist } from '../types/cache/cache-types';

export interface IWishlistCacheRepository {
  findByUserId(userId: WishlistUserId): Promise<CachedWishlist[] | null>;
  save(userId: WishlistUserId, data: CachedWishlist[], ttl?: number): Promise<void>;
  delete(userId: WishlistUserId): Promise<void>;
}

export { CachedWishlist };
