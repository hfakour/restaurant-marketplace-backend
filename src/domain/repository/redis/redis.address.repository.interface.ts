// Redis-specific extensions

import { AddressId, RestaurantId, UserId } from 'src/domain/types/entity-types';
import { IAddressRepository } from '../address.repository.interface';

export interface IRedisAddressRepository extends IAddressRepository {
  deleteForOwner(
    id: AddressId,
    owner: { userId?: UserId; restaurantId?: RestaurantId },
  ): Promise<void>;
  getCacheKey(owner: { userId?: UserId; restaurantId?: RestaurantId }): string;
  clearCache(owner: { userId?: UserId; restaurantId?: RestaurantId }): Promise<void>;
}
