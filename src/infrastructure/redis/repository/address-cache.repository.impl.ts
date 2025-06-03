// src/infrastructure/redis/address-cache.repository.impl.ts

import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import { AddressId, RestaurantId, UserId } from 'src/domain/types/entity-types';
import { AddressEntity } from 'src/domain/entity/address.entity';
import { IRedisAddressRepository } from 'src/domain/repository/redis/redis.address.repository.interface';

/**
 * 💾 AddressCacheRepositoryImpl
 * - Caches all addresses for a user or restaurant in Redis (via @nestjs/cache-manager).
 * - Implements both the IAddressRepository (domain contract) and IRedisAddressRepository (Redis-specific utilities).
 */
@Injectable()
export class AddressCacheRepositoryImpl implements IRedisAddressRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache, // 🌐 Injects the cache manager (configured for Redis)
  ) {}

  /**
   * 🔑 Compute the Redis cache key for a user or restaurant's addresses.
   * - At least one of userId or restaurantId must be provided.
   * - Exposed as a public method for service-layer orchestration.
   */
  public getCacheKey(owner: { userId?: UserId; restaurantId?: RestaurantId }): string {
    if (owner.userId) return `user:${owner.userId}:addresses`;
    if (owner.restaurantId) return `restaurant:${owner.restaurantId}:addresses`;
    throw new Error('Either userId or restaurantId must be provided');
  }

  /**
   * 🧹 Clears all cached addresses for a user or restaurant.
   * @param owner - Must provide userId or restaurantId.
   */
  public async clearCache(owner: { userId?: UserId; restaurantId?: RestaurantId }): Promise<void> {
    const key = this.getCacheKey(owner);
    await this.cache.set(key, []); // Clear by setting to empty array
  }

  /**
   * 🔍 Find a single address by its unique ID.
   * - Not directly supported in Redis cache without key context for performance reasons.
   * - Use getByUser/getByRestaurant in the service layer, or pass owner info.
   */
  findById(id: AddressId): Promise<AddressEntity | null> {
    // Not supported in Redis cache without owner context.
    return Promise.reject(
      new Error(
        `findById (${id}) is not supported in Redis cache without owner context. Use getByUser/getByRestaurant in service layer.`,
      ),
    );
  }

  /**
   * 🔍 Find all addresses for a user.
   */
  async findByUserId(userId: UserId): Promise<AddressEntity[]> {
    const key = this.getCacheKey({ userId });
    const addresses = (await this.cache.get<AddressEntity[]>(key)) ?? [];
    return addresses;
  }

  /**
   * 🔍 Find all addresses for a restaurant.
   */
  async findByRestaurantId(restaurantId: RestaurantId): Promise<AddressEntity[]> {
    const key = this.getCacheKey({ restaurantId });
    const addresses = (await this.cache.get<AddressEntity[]>(key)) ?? [];
    return addresses;
  }

  /**
   * ➕ Add a new address to the Redis cache (for user or restaurant).
   * @returns The created AddressEntity.
   */
  async create(address: AddressEntity): Promise<AddressEntity> {
    const userId = address.user?.id;
    const restaurantId = address.restaurant?.id;
    const key = this.getCacheKey({ userId, restaurantId });

    const addresses = (await this.cache.get<AddressEntity[]>(key)) ?? [];
    addresses.push(address);
    await this.cache.set(key, addresses);

    return address;
  }

  /**
   * ✏️ Update an existing address in cache.
   * @returns The updated AddressEntity.
   */
  async update(address: AddressEntity): Promise<AddressEntity> {
    const userId = address.user?.id;
    const restaurantId = address.restaurant?.id;
    const key = this.getCacheKey({ userId, restaurantId });

    const addresses = (await this.cache.get<AddressEntity[]>(key)) ?? [];

    const index = addresses.findIndex((a) => a.id === address.id);
    if (index === -1) throw new Error('Address not found in cache');
    addresses[index] = address;

    await this.cache.set(key, addresses);

    return address;
  }

  /**
   * ❌ Delete an address by ID (not supported in Redis cache without context).
   * - Use deleteForOwner instead.
   */
  delete(id: AddressId): Promise<void> {
    // Not supported in Redis cache without owner context.
    return Promise.reject(
      new Error(
        `delete (${id}) is not supported in Redis cache without owner context. Use deleteForOwner with userId or restaurantId.`,
      ),
    );
  }

  /**
   * ❌ Delete an address by ID within a specific user or restaurant's address list.
   * @param id AddressId to delete
   * @param owner { userId?: UserId, restaurantId?: RestaurantId }
   */
  public async deleteForOwner(
    id: AddressId,
    owner: { userId?: UserId; restaurantId?: RestaurantId },
  ): Promise<void> {
    const key = this.getCacheKey(owner);
    let addresses = (await this.cache.get<AddressEntity[]>(key)) ?? [];
    addresses = addresses.filter((a) => a.id !== id);
    await this.cache.set(key, addresses);
  }
}
