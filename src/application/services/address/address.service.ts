// src/application/services/address.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { IAddressRepository } from 'src/domain/repository/address.repository.interface';
import { IRedisAddressRepository } from 'src/domain/repository/redis/redis.address.repository.interface';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { AddressEntity } from 'src/domain/entity/address.entity';
import { UserEntity } from 'src/domain/entity/user.entity';
import { RestaurantEntity } from 'src/domain/entity/restaurant.entity';
import { AddressId, UserId, RestaurantId } from 'src/domain/types/entity-types';

type AddressOwner = { userId?: UserId; restaurantId?: RestaurantId };
type Mode = 'online' | 'offline';

@Injectable()
/**
 * 🚦 AddressService
 * - Handles address CRUD for both online (Postgres) and offline (Redis cache) modes.
 * - Uses Redis-specific extensions for cache management and sync.
 */
export class AddressService {
  constructor(
    private readonly pgRepo: IAddressRepository, // Main Postgres repository
    private readonly redisRepo: IRedisAddressRepository, // Redis cache repository with advanced methods
    private readonly em: EntityManager, // MikroORM EntityManager for references
  ) {}

  // ----------- CORE OFFLINE-FIRST CRUD OPERATIONS -----------

  /**
   * 🏠 Create a new address (works offline or online).
   */
  async create(dto: CreateAddressDto, mode: Mode): Promise<AddressEntity> {
    // Create reference entities without fetching from DB
    const user = dto.userId ? this.em.getReference(UserEntity, dto.userId) : undefined;
    const restaurant = dto.restaurantId
      ? this.em.getReference(RestaurantEntity, dto.restaurantId)
      : undefined;

    // Build AddressEntity
    const address = new AddressEntity(
      dto.title,
      dto.street,
      dto.city,
      dto.postalCode,
      dto.country,
      dto.latitude,
      dto.longitude,
      user,
      restaurant,
    );

    // Delegate to correct repository
    if (mode === 'online') {
      return await this.pgRepo.create(address);
    } else {
      return await this.redisRepo.create(address);
    }
  }

  /**
   * ✏️ Update an existing address (offline/online).
   */
  async update(
    id: AddressId,
    dto: UpdateAddressDto,
    mode: Mode,
    owner?: AddressOwner,
  ): Promise<AddressEntity> {
    if (mode === 'online') {
      const existing = await this.pgRepo.findById(id);
      if (!existing) throw new Error('Address not found');
      // Patch fields
      existing.title = dto.title ?? existing.title;
      existing.street = dto.street ?? existing.street;
      existing.city = dto.city ?? existing.city;
      existing.postalCode = dto.postalCode ?? existing.postalCode;
      existing.country = dto.country ?? existing.country;
      existing.latitude = dto.latitude ?? existing.latitude;
      existing.longitude = dto.longitude ?? existing.longitude;
      if (dto.userId) {
        existing.user = this.em.getReference(UserEntity, dto.userId);
      }
      if (dto.restaurantId) {
        existing.restaurant = this.em.getReference(RestaurantEntity, dto.restaurantId);
      }
      return await this.pgRepo.update(existing);
    } else {
      if (!owner?.userId && !owner?.restaurantId)
        throw new Error('Owner context (userId or restaurantId) required for offline mode');
      // Get addresses from Redis cache
      const addresses = owner.userId
        ? await this.redisRepo.findByUserId(owner.userId)
        : await this.redisRepo.findByRestaurantId(owner.restaurantId!);
      const existing = addresses.find((a) => a.id === id);
      if (!existing) throw new Error('Address not found in offline cache');
      // Patch fields
      existing.title = dto.title ?? existing.title;
      existing.street = dto.street ?? existing.street;
      existing.city = dto.city ?? existing.city;
      existing.postalCode = dto.postalCode ?? existing.postalCode;
      existing.country = dto.country ?? existing.country;
      existing.latitude = dto.latitude ?? existing.latitude;
      existing.longitude = dto.longitude ?? existing.longitude;
      if (dto.userId) {
        existing.user = this.em.getReference(UserEntity, dto.userId);
      }
      if (dto.restaurantId) {
        existing.restaurant = this.em.getReference(RestaurantEntity, dto.restaurantId);
      }
      return await this.redisRepo.update(existing);
    }
  }

  /**
   * ❌ Delete an address by ID (offline/online).
   */
  async delete(id: AddressId, mode: Mode, owner?: AddressOwner): Promise<void> {
    if (mode === 'online') {
      await this.pgRepo.delete(id);
    } else {
      if (!owner?.userId && !owner?.restaurantId)
        throw new Error('Owner context (userId or restaurantId) required for offline mode');
      await this.redisRepo.deleteForOwner(id, owner);
    }
  }

  /**
   * 🔍 Find an address by ID.
   * - For Redis, must know owner to find the correct cached bucket.
   */
  async getById(id: AddressId, mode: Mode, owner?: AddressOwner): Promise<AddressEntity | null> {
    if (mode === 'online') {
      return await this.pgRepo.findById(id);
    } else {
      if (!owner?.userId && !owner?.restaurantId)
        throw new Error('Owner context (userId or restaurantId) required for offline mode');
      const addresses = owner.userId
        ? await this.redisRepo.findByUserId(owner.userId)
        : await this.redisRepo.findByRestaurantId(owner.restaurantId!);
      return addresses.find((a) => a.id === id) ?? null;
    }
  }

  /**
   * 👤 Find all addresses for a user (offline/online).
   */
  async getByUser(userId: UserId, mode: Mode): Promise<AddressEntity[]> {
    if (mode === 'online') {
      return await this.pgRepo.findByUserId(userId);
    } else {
      return await this.redisRepo.findByUserId(userId);
    }
  }

  /**
   * 🍽️ Find all addresses for a restaurant (offline/online).
   */
  async getByRestaurant(restaurantId: RestaurantId, mode: Mode): Promise<AddressEntity[]> {
    if (mode === 'online') {
      return await this.pgRepo.findByRestaurantId(restaurantId);
    } else {
      return await this.redisRepo.findByRestaurantId(restaurantId);
    }
  }

  // ----------- SYNC LOGIC: REDIS -> POSTGRES WHEN ONLINE AGAIN -----------

  /**
   * 🔄 Sync all offline address changes (for user or restaurant) from Redis to Postgres.
   * - After sync, clears the Redis cache for that owner using the repo's clearCache().
   */
  async syncOfflineAddressesToPostgres(owner: AddressOwner): Promise<void> {
    let offlineAddresses: AddressEntity[] = [];
    if (owner.userId) {
      offlineAddresses = await this.redisRepo.findByUserId(owner.userId);
    } else if (owner.restaurantId) {
      offlineAddresses = await this.redisRepo.findByRestaurantId(owner.restaurantId);
    } else {
      throw new Error('Owner context (userId or restaurantId) required for sync');
    }

    // Upsert each address to Postgres
    for (const offlineAddr of offlineAddresses) {
      const existing = await this.pgRepo.findById(offlineAddr.id);
      if (existing) {
        // Update existing
        existing.title = offlineAddr.title;
        existing.street = offlineAddr.street;
        existing.city = offlineAddr.city;
        existing.postalCode = offlineAddr.postalCode;
        existing.country = offlineAddr.country;
        existing.latitude = offlineAddr.latitude;
        existing.longitude = offlineAddr.longitude;
        existing.user = offlineAddr.user;
        existing.restaurant = offlineAddr.restaurant;
        await this.pgRepo.update(existing);
      } else {
        // Create new
        await this.pgRepo.create(offlineAddr);
      }
    }

    // Use the Redis repo's clearCache utility for safety
    await this.redisRepo.clearCache(owner);
  }
}
