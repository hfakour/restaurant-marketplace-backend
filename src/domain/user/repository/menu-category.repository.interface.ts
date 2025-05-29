import { MenuCategoryEntity } from '../entities/menu-category.entity';

export interface IMenuCategoryRepository {
  findById(id: string): Promise<MenuCategoryEntity | null>;
  findAll(): Promise<MenuCategoryEntity[]>;
  save(category: MenuCategoryEntity): Promise<void>;
  update(category: MenuCategoryEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
