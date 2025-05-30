import { WishlistId, WishlistUserId } from 'src/domain/types/entity-ids';
import { WishlistEntity } from '../entities/wishlist.entity';

export interface IWishlistRepository {
  findById(id: WishlistId): Promise<WishlistEntity | null>;
  findByUserId(userId: WishlistUserId): Promise<WishlistEntity[]>;
  create(wishlist: WishlistEntity): Promise<void>;
  update(wishlist: WishlistEntity): Promise<void>;
  delete(id: WishlistId): Promise<void>;
  existsById(id: WishlistId): Promise<boolean>;
}
