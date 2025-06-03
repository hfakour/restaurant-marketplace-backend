import {
  FavoriteFoodId,
  FavoriteId,
  FavoriteRestaurantId,
  FavoriteUserId,
} from 'src/domain/types/entity-types';
import { FavoriteEntity } from '../entity/favorite.entity';

/**
 * Repository contract for managing user favorites.
 */
export interface IFavoriteRepository {
  /**
   * Get all favorites for a specific user.
   */
  findByUserId(userId: FavoriteUserId): Promise<FavoriteEntity[]>;

  /**
   * Get all favorites for a specific restaurant.
   */
  findByRestaurantId(restaurantId: FavoriteRestaurantId): Promise<FavoriteEntity[]>;

  /**
   * Get all favorites for a specific food item.
   */
  findByFoodId(foodId: FavoriteFoodId): Promise<FavoriteEntity[]>;

  /**
   * Add a new favorite and return the created entity.
   */
  create(favorite: FavoriteEntity): Promise<FavoriteEntity>;

  /**
   * Remove a favorite by its ID.
   */
  delete(id: FavoriteId): Promise<void>;
}
