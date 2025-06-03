import { MenuId, MenuRestaurantId } from 'src/domain/types/entity-types';
import { MenuEntity } from '../entity/menu.entity';

/**
 * Repository contract for Menu entity (domain layer).
 */
export interface IMenuRepository {
  /**
   * Find a menu by its unique ID.
   */
  findById(id: MenuId): Promise<MenuEntity | null>;

  /**
   * Find all menus for a specific restaurant.
   */
  findByRestaurantId(restaurantId: MenuRestaurantId): Promise<MenuEntity[]>;

  /**
   * Create a new menu and return the created entity.
   */
  create(menu: MenuEntity): Promise<MenuEntity>;

  /**
   * Update an existing menu and return the updated entity.
   */
  update(menu: MenuEntity): Promise<MenuEntity>;

  /**
   * Delete a menu by its ID.
   */
  delete(id: MenuId): Promise<void>;
}
