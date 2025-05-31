// src/application/services/reservation.service.ts

import { Injectable } from '@nestjs/common';
import { ReservationEntity } from 'src/domain/entities/reservation.entity';
import { IReservationRepository } from 'src/domain/repository/reservation.repository.interface';
import {
  ReservationId,
  ReservationUserId,
  ReservationRestaurantId,
} from 'src/domain/types/entity-types';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepo: IReservationRepository) {}

  async findById(id: ReservationId): Promise<ReservationEntity | null> {
    // 🔍 Find reservation by ID
    return this.reservationRepo.findById(id);
  }

  async findByUser(userId: ReservationUserId): Promise<ReservationEntity[]> {
    // 👤 Get all reservations for a user
    return this.reservationRepo.findByUser(userId);
  }

  async findByRestaurant(restaurantId: ReservationRestaurantId): Promise<ReservationEntity[]> {
    // 🍽️ Get all reservations for a restaurant
    return this.reservationRepo.findByRestaurant(restaurantId);
  }

  async create(reservation: ReservationEntity): Promise<void> {
    // 🆕 Save a new reservation
    await this.reservationRepo.create(reservation);
  }

  async update(reservation: ReservationEntity): Promise<void> {
    // 🔁 Update an existing reservation
    await this.reservationRepo.update(reservation);
  }

  async delete(id: ReservationId): Promise<void> {
    // ❌ Remove reservation by ID
    await this.reservationRepo.delete(id);
  }
}
