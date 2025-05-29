// src/infrastructure/database/repositories/address.repository.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { Address } from 'src/domain/user/entities/address.enitity';
import { IAddressRepository } from 'src/domain/user/repository/address.repository.interface';
import { User } from 'src/domain/user/entities/user.entity';
import { Restaurant } from 'src/domain/user/entities/restaurant.entity';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address, 'default')
    private readonly repo: EntityRepository<Address>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a single address by ID
  async findById(id: Address['id']): Promise<Address | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Find all addresses associated with a specific user ID
  async findByUserId(userId: User['id']): Promise<Address[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // 🔍 Find the address associated with a specific restaurant ID
  async findByRestaurantId(restaurantId: Restaurant['id']): Promise<Address | null> {
    return this.repo.findOne({ restaurant: { id: restaurantId } });
  }

  // ➕ Persist a new address in the database
  async create(address: Address): Promise<void> {
    this.em.persist(address);
    await this.em.flush();
  }

  // ✏️ Update an existing address
  async update(address: Address): Promise<void> {
    this.em.persist(address);
    await this.em.flush();
  }

  // ❌ Delete address by ID
  async delete(id: Address['id']): Promise<void> {
    const address = await this.findById(id);
    if (address) {
      this.em.remove(address);
      await this.em.flush();
    }
  }
}
