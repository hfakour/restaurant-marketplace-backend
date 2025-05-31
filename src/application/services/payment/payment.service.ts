// src/application/services/payment.service.ts

import { Injectable } from '@nestjs/common';
import { PaymentEntity } from 'src/domain/entities/payment.entity';
import { IPaymentRepository } from 'src/domain/repository/payment.repository.interface';
import { PaymentId, PaymentOrderId } from 'src/domain/types/entity-types';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepo: IPaymentRepository) {}

  async findById(id: PaymentId): Promise<PaymentEntity | null> {
    // 🔍 Find a payment by its unique ID
    return this.paymentRepo.findById(id);
  }

  async findByOrderId(orderId: PaymentOrderId): Promise<PaymentEntity | null> {
    // 🔍 Retrieve payment using the order ID
    return this.paymentRepo.findByOrderId(orderId);
  }

  async create(payment: PaymentEntity): Promise<void> {
    // 💾 Persist a new payment record
    await this.paymentRepo.save(payment);
  }

  async update(payment: PaymentEntity): Promise<void> {
    // 🔁 Update an existing payment record
    await this.paymentRepo.update(payment);
  }

  async delete(id: PaymentId): Promise<void> {
    // ❌ Remove a payment record by ID
    await this.paymentRepo.delete(id);
  }
}
