// src/application/services/menu-category/menu-category.service.ts

import { Injectable } from '@nestjs/common';
import { MenuCategoryEntity } from 'src/domain/entities/menu-category.entity';
import { IMenuCategoryRepository } from 'src/domain/repository/menu-category.repository.interface';

// 📦 Domain entity and repository interface

// 🆔 Strong typing for IDs
import { MenuCategoryId } from 'src/domain/types/entity-types';

@Injectable()
export class MenuCategoryService {
  // 💉 Dependency Injection of repository
  constructor(private readonly menuCategoryRepo: IMenuCategoryRepository) {}

  // 🔍 Find a menu category by its unique ID
  async getById(id: MenuCategoryId): Promise<MenuCategoryEntity | null> {
    return this.menuCategoryRepo.findById(id);
  }

  // 📋 Get all menu categories in the system
  async getAll(): Promise<MenuCategoryEntity[]> {
    return this.menuCategoryRepo.findAll();
  }

  // ➕ Create and persist a new menu category
  async create(category: MenuCategoryEntity): Promise<void> {
    await this.menuCategoryRepo.save(category);
  }

  // ✏️ Update an existing menu category
  async update(category: MenuCategoryEntity): Promise<void> {
    await this.menuCategoryRepo.update(category);
  }

  // ❌ Delete a menu category by ID
  async delete(id: MenuCategoryId): Promise<void> {
    await this.menuCategoryRepo.delete(id);
  }
}
