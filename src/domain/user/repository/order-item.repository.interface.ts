import { OrderItemEntity } from '../entities/order-item.entity';

export interface IOrderItemRepository {
  findById(id: string): Promise<OrderItemEntity | null>;
  findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
  save(orderItem: OrderItemEntity): Promise<void>;
  update(orderItem: OrderItemEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
