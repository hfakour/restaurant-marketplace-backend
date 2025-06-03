// src/infrastructure/database/repositories/menu-category.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { MenuCategoryEntity } from 'src/domain/entity/menu-category.entity';
import { IMenuCategoryRepository } from 'src/domain/repository/menu-category.repository.interface';
import { MenuCategoryId } from 'src/domain/types/entity-types';

@Injectable()
export class MenuCategoryRepository implements IMenuCategoryRepository {
  constructor(
    @InjectRepository(MenuCategoryEntity, 'default')
    private readonly repo: EntityRepository<MenuCategoryEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find category by its ID
  async findById(id: MenuCategoryId): Promise<MenuCategoryEntity | null> {
    return this.repo.findOne({ id });
  }

  // 📦 Fetch all categories
  async findAll(): Promise<MenuCategoryEntity[]> {
    return this.repo.findAll();
  }

  // ➕ Create new menu category
  async save(category: MenuCategoryEntity): Promise<void> {
    this.em.persist(category);
    await this.em.flush();
  }

  // 🔄 Update category details
  async update(category: MenuCategoryEntity): Promise<void> {
    this.em.persist(category);
    await this.em.flush();
  }

  // ❌ Delete category by ID
  async delete(id: MenuCategoryId): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
