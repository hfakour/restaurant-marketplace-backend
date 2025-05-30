// src/infrastructure/database/repositories/table.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';

import { Table } from 'src/domain/entities/table.entity';
import { ITableRepository } from 'src/domain/repository/table.repository.interface';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

@Injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @InjectRepository(Table, 'default')
    private readonly repo: EntityRepository<Table>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find table by ID
  async findById(id: Table['id']): Promise<Table | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all tables for a specific restaurant
  async findByRestaurant(restaurantId: Restaurant['id']): Promise<Table[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // ➕ Add a new table
  async create(table: Table): Promise<void> {
    this.em.persist(table);
    await this.em.flush();
  }

  // 🔄 Update an existing table
  async update(table: Table): Promise<void> {
    this.em.persist(table);
    await this.em.flush();
  }

  // ❌ Remove a table by ID
  async delete(id: Table['id']): Promise<void> {
    const table = await this.findById(id);
    if (table) {
      this.em.remove(table);
      await this.em.flush();
    }
  }

  // ✅ Check if a table exists by ID
  async existsById(id: Table['id']): Promise<boolean> {
    const count = await this.repo.count({ id });
    return count > 0;
  }
}
