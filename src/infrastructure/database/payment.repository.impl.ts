// src/infrastructure/database/repositories/payment.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { PaymentEntity } from 'src/domain/user/entities/payment.entity';
import { IPaymentRepository } from 'src/domain/user/repository/payment.repository.interface';
import { OrderEntity } from 'src/domain/user/entities/order.entity';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity, 'default')
    private readonly repo: EntityRepository<PaymentEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Get payment by ID
  async findById(id: PaymentEntity['id']): Promise<PaymentEntity | null> {
    return this.repo.findOne({ id }, { populate: ['order'] });
  }

  // 🔍 Get payment by associated order ID
  async findByOrderId(orderId: OrderEntity['id']): Promise<PaymentEntity | null> {
    return this.repo.findOne({ order: { id: orderId } }, { populate: ['order'] });
  }

  // 💾 Save a new payment
  async save(payment: PaymentEntity): Promise<void> {
    this.em.persist(payment);
    await this.em.flush();
  }

  // 🔄 Update an existing payment
  async update(payment: PaymentEntity): Promise<void> {
    this.em.persist(payment);
    await this.em.flush();
  }

  // ❌ Delete payment by ID
  async delete(id: PaymentEntity['id']): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
