import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { IAddressRepository } from 'src/domain/repository/address.repository.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { Address } from 'src/domain/entities/address.enitity';
import { User } from 'src/domain/entities/user.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepo: IAddressRepository,
    private readonly em: EntityManager, // ✅ Inject EntityManager for MikroORM reference
  ) {}

  // 🏠 Create a new address
  async create(dto: CreateAddressDto): Promise<void> {
    // ✅ Create references to related entities without fetching them
    const user = dto.userId ? this.em.getReference(User, dto.userId) : undefined;
    const restaurant = dto.restaurantId
      ? this.em.getReference(Restaurant, dto.restaurantId)
      : undefined;

    // ✅ Create the new address instance
    const address = new Address(
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

    // ✅ Persist the new address
    await this.addressRepo.create(address);
  }

  // 🔁 Update an existing address
  async update(id: Address['id'], dto: UpdateAddressDto): Promise<void> {
    const existing = await this.addressRepo.findById(id);
    if (!existing) throw new Error('Address not found');

    // ✅ Patch all provided fields
    existing.title = dto.title ?? existing.title;
    existing.street = dto.street ?? existing.street;
    existing.city = dto.city ?? existing.city;
    existing.postalCode = dto.postalCode ?? existing.postalCode;
    existing.country = dto.country ?? existing.country;
    existing.latitude = dto.latitude ?? existing.latitude;
    existing.longitude = dto.longitude ?? existing.longitude;

    // ✅ Use getReference to set new associations without lookup
    if (dto.userId) {
      existing.user = this.em.getReference(User, dto.userId);
    }

    if (dto.restaurantId) {
      existing.restaurant = this.em.getReference(Restaurant, dto.restaurantId);
    }

    // ✅ Save the updated address
    await this.addressRepo.update(existing);
  }

  // ❌ Delete an address by ID
  async delete(id: Address['id']): Promise<void> {
    await this.addressRepo.delete(id);
  }

  // 🔍 Find address by ID
  async getById(id: Address['id']): Promise<Address | null> {
    return this.addressRepo.findById(id);
  }

  // 👤 Find all addresses by user ID
  async getByUser(userId: User['id']): Promise<Address[]> {
    return this.addressRepo.findByUserId(userId);
  }

  // 🍽️ Find address by restaurant ID
  async getByRestaurant(restaurantId: Restaurant['id']): Promise<Address | null> {
    return this.addressRepo.findByRestaurantId(restaurantId);
  }
}
