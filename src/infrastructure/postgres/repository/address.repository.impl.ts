// src/infrastructure/postgresql/address.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { IAddressRepository } from 'src/domain/repository/address.repository.interface';
import { AddressEntity } from 'src/domain/entity/address.entity';
import { AddressId, RestaurantId, UserId } from 'src/domain/types/entity-types';

@Injectable()
// 📦 This class is a PostgreSQL implementation of the IAddressRepository contract.
// It connects the domain logic to your actual DB, strictly following Clean Architecture.
export class AddressRepositoryImpl implements IAddressRepository {
  constructor(
    // Inject the MikroORM repository for AddressEntity (scoped to the default DB connection).
    @InjectRepository(AddressEntity, 'default')
    private readonly repo: EntityRepository<AddressEntity>,

    // Inject the EntityManager for low-level ORM commands (persist, flush, remove).
    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  /**
   * 🔍 Find a single address by its unique ID.
   * @param id The unique AddressId
   * @returns AddressEntity if found, or null.
   */
  async findById(id: AddressId): Promise<AddressEntity | null> {
    // Always use strong types for search criteria.
    return await this.repo.findOne({ id });
  }

  /**
   * 🔍 Find all addresses associated with a specific user.
   * @param userId The unique UserId
   * @returns Array of AddressEntity
   */
  async findByUserId(userId: UserId): Promise<AddressEntity[]> {
    // Query by user relation's id; returns [] if none found (never null).
    return await this.repo.find({ user: { id: userId } });
  }

  /**
   * 🔍 Find all addresses associated with a specific restaurant.
   * (Handles multi-branch/chain by returning an array, even if one-to-one.)
   * @param restaurantId The unique RestaurantId
   * @returns Array of AddressEntity
   */
  async findByRestaurantId(restaurantId: RestaurantId): Promise<AddressEntity[]> {
    // Return array for future extensibility, even if current design is one-to-one.
    return await this.repo.find({ restaurant: { id: restaurantId } });
  }

  /**
   * ➕ Persist a new address entity.
   * @param address The AddressEntity to create
   * @returns The created AddressEntity (hydrated with any DB-generated fields)
   */
  async create(address: AddressEntity): Promise<AddressEntity> {
    // Persist the address and flush the EntityManager.
    this.em.persist(address);
    await this.em.flush();
    // After flush, the address entity will be hydrated with DB values (if any).
    return address;
  }

  /**
   * ✏️ Update an existing address.
   * @param address The AddressEntity to update
   * @returns The updated AddressEntity
   */
  async update(address: AddressEntity): Promise<AddressEntity> {
    // Persist changes (MikroORM tracks changes automatically).
    this.em.persist(address);
    await this.em.flush();
    // Return the updated entity (may include updated timestamps).
    return address;
  }

  /**
   * ❌ Delete an address by ID.
   * @param id The unique AddressId to delete
   * @returns Promise<void>
   * @throws Error if address does not exist.
   */
  async delete(id: AddressId): Promise<void> {
    // First, attempt to find the address.
    const address = await this.findById(id);
    if (!address) {
      // Provide a clear error if not found (important for data consistency).
      throw new Error(`Address with ID ${id} not found.`);
    }
    // Remove and flush the deletion.
    this.em.remove(address);
    await this.em.flush();
  }
}
