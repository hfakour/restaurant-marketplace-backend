import { OrderItemId, OrderItemOrderId } from 'src/domain/types/entity-types';
import { OrderItemEntity } from '../entities/order-item.entity';

export interface IOrderItemRepository {
  findById(id: OrderItemId): Promise<OrderItemEntity | null>;
  findByOrderId(orderId: OrderItemOrderId): Promise<OrderItemEntity[]>;
  save(orderItem: OrderItemEntity): Promise<void>;
  update(orderItem: OrderItemEntity): Promise<void>;
  delete(id: OrderItemId): Promise<void>;
}
