import { TableId, TableRestaurantId } from 'src/domain/types/entity-types';
import { Table } from '../entities/table.entity';

export interface ITableRepository {
  findById(id: TableId): Promise<Table | null>;
  findByRestaurant(restaurantId: TableRestaurantId): Promise<Table[]>;
  create(table: Table): Promise<void>;
  update(table: Table): Promise<void>;
  delete(id: TableId): Promise<void>;
  existsById(id: TableId): Promise<boolean>;
}
