import { Table } from '../entities/table.entity';
export interface ITableRepository {
  findById(id: string): Promise<Table | null>;
  findByRestaurant(restaurantId: string): Promise<Table[]>;
  create(table: Table): Promise<void>;
  update(table: Table): Promise<void>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
}
