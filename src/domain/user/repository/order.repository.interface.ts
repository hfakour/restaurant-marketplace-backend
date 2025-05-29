import { OrderEntity } from '../entities/order.entity';

export interface IOrderRepository {
  findById(id: string): Promise<OrderEntity | null>;
  findAllByUser(userId: string): Promise<OrderEntity[]>;
  save(order: OrderEntity): Promise<void>;
  update(order: OrderEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
