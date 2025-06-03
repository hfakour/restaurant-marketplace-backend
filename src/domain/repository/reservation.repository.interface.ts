import {
  ReservationId,
  ReservationRestaurantId,
  ReservationUserId,
} from 'src/domain/types/entity-types';
import { ReservationEntity } from '../entity/reservation.entity';

/**
 * Repository contract for Reservation entity (domain layer).
 */
export interface IReservationRepository {
  /**
   * Find a reservation by its unique ID.
   */
  findById(id: ReservationId): Promise<ReservationEntity | null>;

  /**
   * Find all reservations for a specific user.
   */
  findByUser(userId: ReservationUserId): Promise<ReservationEntity[]>;

  /**
   * Find all reservations for a specific restaurant.
   */
  findByRestaurant(restaurantId: ReservationRestaurantId): Promise<ReservationEntity[]>;

  /**
   * Create a new reservation and return the created entity.
   */
  create(reservation: ReservationEntity): Promise<ReservationEntity>;

  /**
   * Update an existing reservation and return the updated entity.
   */
  update(reservation: ReservationEntity): Promise<ReservationEntity>;

  /**
   * Delete a reservation by its ID.
   */
  delete(id: ReservationId): Promise<void>;
}
