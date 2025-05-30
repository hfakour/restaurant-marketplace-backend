import { MenuCategoryId } from 'src/domain/types/entity-ids';
import { MenuCategoryEntity } from '../entities/menu-category.entity';

export interface IMenuCategoryRepository {
  findById(id: MenuCategoryId): Promise<MenuCategoryEntity | null>;
  findAll(): Promise<MenuCategoryEntity[]>;
  save(category: MenuCategoryEntity): Promise<void>;
  update(category: MenuCategoryEntity): Promise<void>;
  delete(id: MenuCategoryId): Promise<void>;
}
