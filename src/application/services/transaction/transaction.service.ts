// src/application/services/transaction.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { ITransactionRepository } from 'src/domain/repository/transaction.repository.interface';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionId } from 'src/domain/types/entity-types';

import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';

import { User } from 'src/domain/entities/user.entity';
import { OrderEntity } from 'src/domain/entities/order.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepo: ITransactionRepository,

    // ✅ Inject MikroORM EntityManager for reference lookup
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a transaction by ID
  async findById(id: TransactionId): Promise<Transaction | null> {
    return this.transactionRepo.findById(id);
  }

  // 🔍 Get all transactions for a given user
  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepo.findByUserId(userId);
  }

  // ➕ Create and persist a new transaction
  async create(dto: CreateTransactionDto): Promise<Transaction> {
    // ✅ Construct a new Transaction with base values
    const transaction = new Transaction(dto.amount, dto.status, dto.method);

    // 🔗 Relate user using reference by ID only (efficient)
    transaction.user = this.em.getReference(User, dto.userId);

    // 🔗 Optional relation to order
    if (dto.orderId) {
      transaction.order = this.em.getReference(OrderEntity, dto.orderId);
    }

    await this.transactionRepo.create(transaction);
    return transaction;
  }

  // 🔁 Update an existing transaction
  async update(id: TransactionId, dto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionRepo.findById(id);
    if (!transaction) throw new NotFoundException('Transaction not found');

    // 🛠 Patch individual fields if present
    if (dto.amount !== undefined) transaction.amount = dto.amount;
    if (dto.status !== undefined) transaction.status = dto.status;
    if (dto.method !== undefined) transaction.method = dto.method;

    // 🔗 Patch relations via references
    if (dto.userId) {
      transaction.user = this.em.getReference(User, dto.userId);
    }

    if (dto.orderId) {
      transaction.order = this.em.getReference(OrderEntity, dto.orderId);
    }

    await this.transactionRepo.update(transaction);
    return transaction;
  }

  // ❌ Remove a transaction
  async delete(id: TransactionId): Promise<void> {
    const exists = await this.transactionRepo.existsById(id);
    if (!exists) throw new NotFoundException('Transaction not found');

    await this.transactionRepo.delete(id);
  }

  // ✅ Check if transaction exists
  async existsById(id: TransactionId): Promise<boolean> {
    return this.transactionRepo.existsById(id);
  }
}
