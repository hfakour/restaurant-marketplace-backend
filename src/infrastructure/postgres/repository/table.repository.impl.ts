// src/infrastructure/database/repositories/table.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';

import { TableEntity } from 'src/domain/entity/table.entity';
import { ITableRepository } from 'src/domain/repository/table.repository.interface';
import { RestaurantId, TableId } from 'src/domain/types/entity-types';

@Injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @InjectRepository(TableEntity, 'default')
    private readonly repo: EntityRepository<TableEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find table by ID
  async findById(id: TableId): Promise<TableEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all tables for a specific restaurant
  async findByRestaurant(restaurantId: RestaurantId): Promise<TableEntity[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // ➕ Add a new table
  async create(table: TableEntity): Promise<void> {
    this.em.persist(table);
    await this.em.flush();
  }

  // 🔄 Update an existing table
  async update(table: TableEntity): Promise<void> {
    this.em.persist(table);
    await this.em.flush();
  }

  // ❌ Remove a table by ID
  async delete(id: TableId): Promise<void> {
    const table = await this.findById(id);
    if (table) {
      this.em.remove(table);
      await this.em.flush();
    }
  }

  // ✅ Check if a table exists by ID
  async existsById(id: TableId): Promise<boolean> {
    const count = await this.repo.count({ id });
    return count > 0;
  }
}
