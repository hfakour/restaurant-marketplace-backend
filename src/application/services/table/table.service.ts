// src/application/services/table.service.ts

import { Injectable } from '@nestjs/common';
import { Table } from 'src/domain/entities/table.entity';
import { ITableRepository } from 'src/domain/repository/table.repository.interface';

import { TableId, TableRestaurantId } from 'src/domain/types/entity-types';

@Injectable()
export class TableService {
  constructor(private readonly tableRepo: ITableRepository) {}

  async findById(id: TableId): Promise<Table | null> {
    // 🔍 Find a table by its ID
    return this.tableRepo.findById(id);
  }

  async findByRestaurant(restaurantId: TableRestaurantId): Promise<Table[]> {
    // 🍽️ Find all tables belonging to a restaurant
    return this.tableRepo.findByRestaurant(restaurantId);
  }

  async create(table: Table): Promise<void> {
    // 🆕 Create a new table
    await this.tableRepo.create(table);
  }

  async update(table: Table): Promise<void> {
    // 🔁 Update table details
    await this.tableRepo.update(table);
  }

  async delete(id: TableId): Promise<void> {
    // ❌ Delete table by ID
    await this.tableRepo.delete(id);
  }

  async existsById(id: TableId): Promise<boolean> {
    // ✅ Check if a table with this ID exists
    return this.tableRepo.existsById(id);
  }
}
