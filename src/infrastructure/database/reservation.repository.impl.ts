// src/infrastructure/database/repositories/reservation.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { ReservationEntity } from 'src/domain/user/entities/reservation.entity';
import { IReservationRepository } from 'src/domain/user/repository/reservation.repository.interface';
import { User } from 'src/domain/user/entities/user.entity';
import { Restaurant } from 'src/domain/user/entities/restaurant.entity'; // 👈 import for typings

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity, 'default')
    private readonly repo: EntityRepository<ReservationEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a reservation by its ID
  async findById(id: ReservationEntity['id']): Promise<ReservationEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all reservations for a specific user
  async findByUser(userId: User['id']): Promise<ReservationEntity[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // 🔍 Get all reservations for a specific restaurant
  async findByRestaurant(restaurantId: Restaurant['id']): Promise<ReservationEntity[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // ➕ Create new reservation
  async create(reservation: ReservationEntity): Promise<void> {
    this.em.persist(reservation);
    await this.em.flush();
  }

  // 🔄 Update reservation
  async update(reservation: ReservationEntity): Promise<void> {
    this.em.persist(reservation);
    await this.em.flush();
  }

  // ❌ Delete reservation by ID
  async delete(id: ReservationEntity['id']): Promise<void> {
    const found = await this.findById(id);
    if (found) {
      this.em.remove(found);
      await this.em.flush();
    }
  }
}
