import { OrderId, OrderUserId } from 'src/domain/types/entity-types';
import { OrderEntity } from '../entity/order.entity';

/**
 * Repository contract for Order entity (domain layer).
 */
export interface IOrderRepository {
  /**
   * Find an order by its unique ID.
   */
  findById(id: OrderId): Promise<OrderEntity | null>;

  /**
   * Find all orders for a specific user.
   */
  findAllByUser(userId: OrderUserId): Promise<OrderEntity[]>;

  /**
   * Create a new order and return the created entity.
   */
  create(order: OrderEntity): Promise<OrderEntity>;

  /**
   * Update an existing order and return the updated entity.
   */
  update(order: OrderEntity): Promise<OrderEntity>;

  /**
   * Delete an order by its ID.
   */
  delete(id: OrderId): Promise<void>;
}
