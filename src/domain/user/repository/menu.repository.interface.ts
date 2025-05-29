import { MenuEntity } from '../entities/menu.entity';

export interface IMenuRepository {
  findById(id: string): Promise<MenuEntity | null>;
  findByRestaurantId(restaurantId: string): Promise<MenuEntity[]>;
  save(menu: MenuEntity): Promise<void>;
  update(menu: MenuEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
