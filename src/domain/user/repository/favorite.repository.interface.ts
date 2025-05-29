import { FavoriteEntity } from '../entities/favorite.entity';

export abstract class IFavoriteRepository {
  abstract findByUserId(userId: string): Promise<FavoriteEntity[]>;
  abstract findByRestaurantId(restaurantId: string): Promise<FavoriteEntity[]>;
  abstract findByFoodId(foodId: string): Promise<FavoriteEntity[]>;
  abstract create(favorite: FavoriteEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
