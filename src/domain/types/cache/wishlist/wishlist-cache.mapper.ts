// src/domain/types/cache/wishlist-cache.mapper.ts

import { WishlistEntity } from 'src/domain/entity/wishlist.entity';
import { FoodEntity } from 'src/domain/entity/food.entity';
import { RestaurantEntity } from 'src/domain/entity/restaurant.entity';
import { CachedWishlist } from '../cache-types';

export class WishlistCacheMapper {
  // 🔁 Convert full entity to lightweight cache-safe version
  static toCacheModel(entity: WishlistEntity): CachedWishlist {
    return {
      id: entity.id,
      title: entity.title,
      foodIds: [...entity.foods].map((food: FoodEntity) => food.id),
      restaurantIds: [...entity.restaurants].map((rest: RestaurantEntity) => rest.id),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  // 🔁 Reconstruct domain entity from cached object
  static fromCacheModel(cached: CachedWishlist): WishlistEntity {
    const entity = new WishlistEntity();

    entity.id = cached.id;
    entity.title = cached.title;

    // Use empty proxies (lazy references)
    entity.foods.set(cached.foodIds.map((id) => ({ id }) as FoodEntity));

    entity.restaurants.set(cached.restaurantIds.map((id) => ({ id }) as RestaurantEntity));

    entity.createdAt = new Date(cached.createdAt);
    entity.updatedAt = new Date(cached.updatedAt);

    return entity;
  }
}
