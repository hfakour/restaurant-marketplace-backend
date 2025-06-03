// src/infrastructure/database/repositories/menu.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { MenuEntity } from 'src/domain/entity/menu.entity';
import { IMenuRepository } from 'src/domain/repository/menu.repository.interface';
import { MenuId, RestaurantId } from 'src/domain/types/entity-types';

@Injectable()
export class MenuRepository implements IMenuRepository {
  constructor(
    @InjectRepository(MenuEntity, 'default')
    private readonly repo: EntityRepository<MenuEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a menu by its ID
  async findById(id: MenuId): Promise<MenuEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all menus for a specific restaurant
  async findByRestaurantId(restaurantId: RestaurantId): Promise<MenuEntity[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // ➕ Save a new menu
  async save(menu: MenuEntity): Promise<void> {
    this.em.persist(menu);
    await this.em.flush();
  }

  // 🔄 Update an existing menu
  async update(menu: MenuEntity): Promise<void> {
    this.em.persist(menu);
    await this.em.flush();
  }

  // ❌ Delete a menu by ID
  async delete(id: MenuId): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
