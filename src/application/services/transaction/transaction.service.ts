// src/application/services/transaction.service.ts

import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { ITransactionRepository } from 'src/domain/repository/transaction.repository.interface';

import { TransactionId, TransactionUserId } from 'src/domain/types/entity-types';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async findById(id: TransactionId): Promise<Transaction | null> {
    // 🔍 Retrieve a transaction by its unique ID
    return this.transactionRepo.findById(id);
  }

  async findByUserId(userId: TransactionUserId): Promise<Transaction[]> {
    // 👤 Get all transactions for a specific user
    return this.transactionRepo.findByUserId(userId);
  }

  async create(transaction: Transaction): Promise<void> {
    // 🆕 Create and save a new transaction
    await this.transactionRepo.create(transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    // 🔁 Update an existing transaction
    await this.transactionRepo.update(transaction);
  }

  async delete(id: TransactionId): Promise<void> {
    // ❌ Remove a transaction by its ID
    await this.transactionRepo.delete(id);
  }

  async existsById(id: TransactionId): Promise<boolean> {
    // ✅ Check if a transaction exists by ID
    return this.transactionRepo.existsById(id);
  }
}
