import {
  ReservationId,
  ReservationRestaurantId,
  ReservationUserId,
} from 'src/domain/types/entity-types';
import { ReservationEntity } from '../entities/reservation.entity';

export interface IReservationRepository {
  findById(id: ReservationId): Promise<ReservationEntity | null>;
  findByUser(userId: ReservationUserId): Promise<ReservationEntity[]>;
  findByRestaurant(restaurantId: ReservationRestaurantId): Promise<ReservationEntity[]>;
  create(reservation: ReservationEntity): Promise<void>;
  update(reservation: ReservationEntity): Promise<void>;
  delete(id: ReservationId): Promise<void>;
}
