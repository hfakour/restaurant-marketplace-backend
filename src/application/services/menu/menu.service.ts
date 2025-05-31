// src/application/services/menu/menu.service.ts

import { Injectable } from '@nestjs/common';
import { MenuEntity } from 'src/domain/entities/menu.entity';
import { IMenuRepository } from 'src/domain/repository/menu.repository.interface';

// 🧱 Domain-level entity and repository contract

// 🆔 Strongly typed ID aliases for safety
import { MenuId, MenuRestaurantId } from 'src/domain/types/entity-types';

@Injectable()
export class MenuService {
  // 🛠️ Inject domain repository
  constructor(private readonly menuRepo: IMenuRepository) {}

  // 🔍 Get a specific menu by its ID
  async getById(id: MenuId): Promise<MenuEntity | null> {
    return this.menuRepo.findById(id);
  }

  // 🔗 Get all menus belonging to a specific restaurant
  async getByRestaurantId(restaurantId: MenuRestaurantId): Promise<MenuEntity[]> {
    return this.menuRepo.findByRestaurantId(restaurantId);
  }

  // ➕ Save a new menu instance
  async create(menu: MenuEntity): Promise<void> {
    await this.menuRepo.save(menu);
  }

  // 🛠️ Update an existing menu's details
  async update(menu: MenuEntity): Promise<void> {
    await this.menuRepo.update(menu);
  }

  // ❌ Remove a menu by its unique ID
  async delete(id: MenuId): Promise<void> {
    await this.menuRepo.delete(id);
  }
}
