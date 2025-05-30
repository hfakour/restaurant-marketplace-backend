import { MenuId, MenuRestaurantId } from 'src/domain/types/entity-types';
import { MenuEntity } from '../entities/menu.entity';

export interface IMenuRepository {
  findById(id: MenuId): Promise<MenuEntity | null>;
  findByRestaurantId(restaurantId: MenuRestaurantId): Promise<MenuEntity[]>;
  save(menu: MenuEntity): Promise<void>;
  update(menu: MenuEntity): Promise<void>;
  delete(id: MenuId): Promise<void>;
}
