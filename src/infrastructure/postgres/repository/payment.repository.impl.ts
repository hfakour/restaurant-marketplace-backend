// src/infrastructure/database/repositories/payment.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { PaymentEntity } from 'src/domain/entity/payment.entity';
import { IPaymentRepository } from 'src/domain/repository/payment.repository.interface';
import { OrderId, PaymentId } from 'src/domain/types/entity-types';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity, 'default')
    private readonly repo: EntityRepository<PaymentEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Get payment by ID
  async findById(id: PaymentId): Promise<PaymentEntity | null> {
    return this.repo.findOne({ id }, { populate: ['order'] });
  }

  // 🔍 Get payment by associated order ID
  async findByOrderId(orderId: OrderId): Promise<PaymentEntity | null> {
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
  async delete(id: PaymentId): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
