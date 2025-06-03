// src/infrastructure/database/repositories/reservation.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { ReservationEntity } from 'src/domain/entity/reservation.entity';
import { IReservationRepository } from 'src/domain/repository/reservation.repository.interface';
import { ReservationId, RestaurantId, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity, 'default')
    private readonly repo: EntityRepository<ReservationEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a reservation by its ID
  async findById(id: ReservationId): Promise<ReservationEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all reservations for a specific user
  async findByUser(userId: UserId): Promise<ReservationEntity[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // 🔍 Get all reservations for a specific restaurant
  async findByRestaurant(restaurantId: RestaurantId): Promise<ReservationEntity[]> {
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
  async delete(id: ReservationId): Promise<void> {
    const found = await this.findById(id);
    if (found) {
      this.em.remove(found);
      await this.em.flush();
    }
  }
}
