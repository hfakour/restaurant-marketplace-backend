// src/infrastructure/database/repositories/transaction.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { Transaction } from 'src/domain/entities/transaction.entity';
import { ITransactionRepository } from 'src/domain/repository/transaction.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction, 'default')
    private readonly transactionRepo: EntityRepository<Transaction>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find transaction by ID
  async findById(id: Transaction['id']): Promise<Transaction | null> {
    return await this.transactionRepo.findOne({ id });
  }

  // 🔍 Get all transactions made by a specific user
  async findByUserId(userId: User['id']): Promise<Transaction[]> {
    return await this.transactionRepo.find({ user: { id: userId } });
  }

  // ➕ Create a new transaction
  async create(transaction: Transaction): Promise<void> {
    this.em.persist(transaction);
    await this.em.flush();
  }

  // 🔄 Update existing transaction
  async update(transaction: Transaction): Promise<void> {
    this.em.persist(transaction);
    await this.em.flush();
  }

  // ❌ Delete a transaction by ID
  async delete(id: Transaction['id']): Promise<void> {
    const transaction = await this.findById(id);
    if (transaction) {
      this.em.remove(transaction);
      await this.em.flush();
    }
  }

  // ✅ Check if transaction exists by ID
  async existsById(id: Transaction['id']): Promise<boolean> {
    const count = await this.transactionRepo.count({ id });
    return count > 0;
  }
}
