import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Table } from 'src/domain/user/entities/table.entity';
import { ITableRepository } from 'src/domain/user/repository/table.repository.interface';

@Injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @InjectRepository(Table, 'default')
    private readonly repo: EntityRepository<Table>,
    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  async findById(id: string) {
    return this.repo.findOne({ id });
  }
  async findByRestaurant(restaurantId: string) {
    return this.repo.find({ restaurant: restaurantId });
  }
  async create(table: Table) {
    this.em.persist(table);
    await this.em.flush();
    return table;
  }
  async update(table: Table) {
    await this.em.flush();
    return table;
  }
  async delete(id: string) {
    const table = await this.findById(id);
    if (table) {
      this.em.remove(table);
      await this.em.flush();
    }
  }
  async existsById(id: string) {
    return (await this.repo.count({ id })) > 0;
  }
}
