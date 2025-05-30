// src/infrastructure/database/repositories/order-item.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { OrderItemEntity } from 'src/domain/entities/order-item.entity';
import { IOrderItemRepository } from 'src/domain/repository/order-item.repository.interface';
import { OrderEntity } from 'src/domain/entities/order.entity';

@Injectable()
export class OrderItemRepository implements IOrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity, 'default')
    private readonly repo: EntityRepository<OrderItemEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a single order item by ID
  async findById(id: OrderItemEntity['id']): Promise<OrderItemEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Find all items belonging to a given order
  async findByOrderId(orderId: OrderEntity['id']): Promise<OrderItemEntity[]> {
    return this.repo.find({ order: { id: orderId } });
  }

  // ➕ Save a new order item
  async save(orderItem: OrderItemEntity): Promise<void> {
    this.em.persist(orderItem);
    await this.em.flush();
  }

  // 🔄 Update an existing order item
  async update(orderItem: OrderItemEntity): Promise<void> {
    this.em.persist(orderItem);
    await this.em.flush();
  }

  // ❌ Delete order item by ID
  async delete(id: OrderItemEntity['id']): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
