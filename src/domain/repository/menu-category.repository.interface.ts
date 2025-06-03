import { MenuCategoryId } from 'src/domain/types/entity-types';
import { MenuCategoryEntity } from '../entity/menu-category.entity';

/**
 * Repository contract for MenuCategory entity (domain layer).
 */
export interface IMenuCategoryRepository {
  /**
   * Find a menu category by its unique ID.
   */
  findById(id: MenuCategoryId): Promise<MenuCategoryEntity | null>;

  /**
   * Find all menu categories.
   */
  findAll(): Promise<MenuCategoryEntity[]>;

  /**
   * Create a new menu category and return the created entity.
   */
  create(category: MenuCategoryEntity): Promise<MenuCategoryEntity>;

  /**
   * Update an existing menu category and return the updated entity.
   */
  update(category: MenuCategoryEntity): Promise<MenuCategoryEntity>;

  /**
   * Delete a menu category by its ID.
   */
  delete(id: MenuCategoryId): Promise<void>;
}
