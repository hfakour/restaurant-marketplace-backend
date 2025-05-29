import { ReservationEntity } from '../entities/reservation.entity';
export interface IReservationRepository {
  findById(id: string): Promise<ReservationEntity | null>;
  findByUser(userId: string): Promise<ReservationEntity[]>;
  findByRestaurant(restaurantId: string): Promise<ReservationEntity[]>;
  create(reservation: ReservationEntity): Promise<void>;
  update(reservation: ReservationEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
