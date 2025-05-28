import { Table } from '../entities/table.entity';

export abstract class ITableRepository {
  abstract findById(id: string): Promise<Table | null>;
  abstract findByRestaurant(restaurantId: string): Promise<Table[]>;
  abstract create(table: Table): Promise<Table>;
  abstract update(table: Table): Promise<Table>;
  abstract delete(id: string): Promise<void>;
  abstract existsById(id: string): Promise<boolean>;
}
