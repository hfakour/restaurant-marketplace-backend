import { OrderId, OrderUserId } from 'src/domain/types/entity-ids';
import { OrderEntity } from '../entities/order.entity';

export interface IOrderRepository {
  findById(id: OrderId): Promise<OrderEntity | null>;
  findAllByUser(userId: OrderUserId): Promise<OrderEntity[]>;
  save(order: OrderEntity): Promise<void>;
  update(order: OrderEntity): Promise<void>;
  delete(id: OrderId): Promise<void>;
}
