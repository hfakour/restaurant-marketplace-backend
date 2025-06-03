import { WishlistId, WishlistUserId } from 'src/domain/types/entity-types';
import { WishlistEntity } from '../entity/wishlist.entity';

/**
 * Repository contract for Wishlist entity (domain layer).
 */
export interface IWishlistRepository {
  /**
   * Find a wishlist by its unique ID.
   */
  findById(id: WishlistId): Promise<WishlistEntity | null>;

  /**
   * Find all wishlists for a specific user.
   */
  findByUserId(userId: WishlistUserId): Promise<WishlistEntity[]>;

  /**
   * Create a new wishlist and return the created entity.
   */
  create(wishlist: WishlistEntity): Promise<WishlistEntity>;

  /**
   * Update an existing wishlist and return the updated entity.
   */
  update(wishlist: WishlistEntity): Promise<WishlistEntity>;

  /**
   * Delete a wishlist by its ID.
   */
  delete(id: WishlistId): Promise<void>;

  /**
   * Check if a wishlist exists by its ID.
   */
  existsById(id: WishlistId): Promise<boolean>;
}
