import { OrderItemId, OrderItemOrderId } from 'src/domain/types/entity-types';
import { OrderItemEntity } from '../entity/order-item.entity';

/**
 * Repository contract for OrderItem entity (domain layer).
 */
export interface IOrderItemRepository {
  /**
   * Find an order item by its unique ID.
   */
  findById(id: OrderItemId): Promise<OrderItemEntity | null>;

  /**
   * Find all order items for a specific order.
   */
  findByOrderId(orderId: OrderItemOrderId): Promise<OrderItemEntity[]>;

  /**
   * Create a new order item and return the created entity.
   */
  create(orderItem: OrderItemEntity): Promise<OrderItemEntity>;

  /**
   * Update an existing order item and return the updated entity.
   */
  update(orderItem: OrderItemEntity): Promise<OrderItemEntity>;

  /**
   * Delete an order item by its ID.
   */
  delete(id: OrderItemId): Promise<void>;
}
