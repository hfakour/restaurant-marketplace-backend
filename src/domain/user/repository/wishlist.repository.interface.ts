import { WishlistEntity } from '../entities/wishlist.entity';

export abstract class IWishlistRepository {
  abstract findById(id: string): Promise<WishlistEntity | null>;
  abstract findByUserId(userId: string): Promise<WishlistEntity[]>;
  abstract create(wishlist: WishlistEntity): Promise<WishlistEntity>;
  abstract update(wishlist: WishlistEntity): Promise<WishlistEntity>;
  abstract delete(id: string): Promise<void>;
  abstract existsById(id: string): Promise<boolean>;
}
