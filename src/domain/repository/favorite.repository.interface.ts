import {
  FavoriteFoodId,
  FavoriteId,
  FavoriteRestaurantId,
  FavoriteUserId,
} from 'src/domain/types/entity-types';
import { FavoriteEntity } from '../entities/favorite.entity';

export abstract class IFavoriteRepository {
  abstract findByUserId(userId: FavoriteUserId): Promise<FavoriteEntity[]>;
  abstract findByRestaurantId(restaurantId: FavoriteRestaurantId): Promise<FavoriteEntity[]>;
  abstract findByFoodId(foodId: FavoriteFoodId): Promise<FavoriteEntity[]>;
  abstract create(favorite: FavoriteEntity): Promise<void>;
  abstract delete(id: FavoriteId): Promise<void>;
}
