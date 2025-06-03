// src/infrastructure/database/repositories/transaction.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { TransactionEntity } from 'src/domain/entity/transaction.entity';
import { ITransactionRepository } from 'src/domain/repository/transaction.repository.interface';
import { TransactionId, TransactionRestaurantId, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity, 'default')
    private readonly transactionRepo: EntityRepository<TransactionEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find transaction by ID
  async findById(id: TransactionId): Promise<TransactionEntity | null> {
    return await this.transactionRepo.findOne({ id });
  }

  // 🔍 Get all transactions made by a specific user
  async findByUserId(userId: UserId): Promise<TransactionEntity[]> {
    return await this.transactionRepo.find({ user: { id: userId } });
  }

  async findByRestaurantId(restaurantId: TransactionRestaurantId): Promise<TransactionEntity[]> {
    return await this.transactionRepo.find({ restaurant: { id: restaurantId } });
  }

  // ➕ Create a new transaction
  async create(transaction: TransactionEntity): Promise<void> {
    this.em.persist(transaction);
    await this.em.flush();
  }

  // 🔄 Update existing transaction
  async update(transaction: TransactionEntity): Promise<void> {
    this.em.persist(transaction);
    await this.em.flush();
  }

  // ❌ Delete a transaction by ID
  async delete(id: TransactionId): Promise<void> {
    const transaction = await this.findById(id);
    if (transaction) {
      this.em.remove(transaction);
      await this.em.flush();
    }
  }

  // ✅ Check if transaction exists by ID
  async existsById(id: TransactionId): Promise<boolean> {
    const count = await this.transactionRepo.count({ id });
    return count > 0;
  }
}
