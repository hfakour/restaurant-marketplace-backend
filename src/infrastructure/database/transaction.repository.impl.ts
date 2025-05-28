import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Transaction } from 'src/domain/user/entities/transaction.entity';
import { ITransactionRepository } from 'src/domain/user/repository/transaction.repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction, 'default')
    private readonly transactionRepo: EntityRepository<Transaction>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<Transaction | null> {
    return await this.transactionRepo.findOne({ id });
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return await this.transactionRepo.find({ user: userId });
  }

  async create(transaction: Transaction): Promise<Transaction> {
    this.em.persist(transaction);
    await this.em.flush();
    return transaction;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    await this.em.flush();
    return transaction;
  }

  async delete(id: string): Promise<void> {
    const transaction = await this.findById(id);
    if (transaction) {
      this.em.remove(transaction);
      await this.em.flush();
    }
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.transactionRepo.count({ id });
    return count > 0;
  }
}
