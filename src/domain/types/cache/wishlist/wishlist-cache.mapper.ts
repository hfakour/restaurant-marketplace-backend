// src/domain/types/cache/wishlist-cache.mapper.ts

import { WishlistEntity } from 'src/domain/entities/wishlist.entity';
import { Food } from 'src/domain/entities/food.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';
import { CachedWishlist } from '../cache-types';

export class WishlistCacheMapper {
  // 🔁 Convert full entity to lightweight cache-safe version
  static toCacheModel(entity: WishlistEntity): CachedWishlist {
    return {
      id: entity.id,
      title: entity.title,
      foodIds: [...entity.foods].map((food: Food) => food.id),
      restaurantIds: [...entity.restaurants].map((rest: Restaurant) => rest.id),
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
    entity.foods.set(cached.foodIds.map((id) => ({ id }) as Food));

    entity.restaurants.set(cached.restaurantIds.map((id) => ({ id }) as Restaurant));

    entity.createdAt = new Date(cached.createdAt);
    entity.updatedAt = new Date(cached.updatedAt);

    return entity;
  }
}
