import { ReservationEntity } from '../entities/reservation.entity';

export abstract class IReservationRepository {
  abstract findById(id: string): Promise<ReservationEntity | null>;
  abstract findByUser(userId: string): Promise<ReservationEntity[]>;
  abstract findByRestaurant(restaurantId: string): Promise<ReservationEntity[]>;
  abstract create(reservation: ReservationEntity): Promise<ReservationEntity>;
  abstract update(reservation: ReservationEntity): Promise<ReservationEntity>;
  abstract delete(id: string): Promise<void>;
}
