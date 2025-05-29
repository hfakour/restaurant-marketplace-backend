import { WishlistEntity } from '../entities/wishlist.entity';
export interface IWishlistRepository {
  findById(id: string): Promise<WishlistEntity | null>;
  findByUserId(userId: string): Promise<WishlistEntity[]>;
  create(wishlist: WishlistEntity): Promise<void>;
  update(wishlist: WishlistEntity): Promise<void>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
}
