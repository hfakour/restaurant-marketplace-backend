// src/infrastructure/database/repositories/order.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repository/order.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity, 'default')
    private readonly repo: EntityRepository<OrderEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find one order by ID
  async findById(id: OrderEntity['id']): Promise<OrderEntity | null> {
    return this.repo.findOne(
      { id },
      {
        populate: ['user', 'restaurant', 'deliveryAddress', 'items', 'payment', 'coupon'],
      },
    );
  }

  // 🔍 Find all orders placed by a specific user
  async findAllByUser(userId: User['id']): Promise<OrderEntity[]> {
    return this.repo.find(
      { user: { id: userId } },
      {
        populate: ['restaurant', 'items', 'payment', 'coupon'],
      },
    );
  }

  // 💾 Save a new order
  async save(order: OrderEntity): Promise<void> {
    this.em.persist(order);
    await this.em.flush();
  }

  // 🔄 Update an order
  async update(order: OrderEntity): Promise<void> {
    this.em.persist(order);
    await this.em.flush();
  }

  // ❌ Delete an order by ID
  async delete(id: OrderEntity['id']): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
