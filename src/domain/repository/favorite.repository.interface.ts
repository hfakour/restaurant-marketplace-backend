import {
  FavoriteFoodId,
  FavoriteId,
  FavoriteRestaurantId,
  FavoriteUserId,
} from 'src/domain/types/entity-types';
import { FavoriteEntity } from '../entities/favorite.entity';

export interface IFavoriteRepository {
  findByUserId(userId: FavoriteUserId): Promise<FavoriteEntity[]>;
  findByRestaurantId(restaurantId: FavoriteRestaurantId): Promise<FavoriteEntity[]>;
  findByFoodId(foodId: FavoriteFoodId): Promise<FavoriteEntity[]>;
  create(favorite: FavoriteEntity): Promise<void>;
  delete(id: FavoriteId): Promise<void>;
}
