import { TableId, TableRestaurantId } from 'src/domain/types/entity-types';
import { TableEntity } from '../entity/table.entity';

/**
 * Repository contract for Table entity (domain layer).
 */
export interface ITableRepository {
  /**
   * Find a table by its unique ID.
   */
  findById(id: TableId): Promise<TableEntity | null>;

  /**
   * Find all tables for a specific restaurant.
   */
  findByRestaurant(restaurantId: TableRestaurantId): Promise<TableEntity[]>;

  /**
   * Create a new table and return the created entity.
   */
  create(table: TableEntity): Promise<TableEntity>;

  /**
   * Update an existing table and return the updated entity.
   */
  update(table: TableEntity): Promise<TableEntity>;

  /**
   * Delete a table by its ID.
   */
  delete(id: TableId): Promise<void>;

  /**
   * Check if a table exists by its ID.
   */
  existsById(id: TableId): Promise<boolean>;
}
