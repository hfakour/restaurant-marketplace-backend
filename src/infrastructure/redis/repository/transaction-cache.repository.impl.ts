// src/infrastructure/redis/repositories/transaction-cache.repository.impl.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TransactionEntity } from 'src/domain/entity/transaction.entity';
import { ITransactionCacheRepository } from 'src/domain/repository/transaction-cache.repository.interface';

@Injectable()
export class TransactionCacheRepositoryImpl implements ITransactionCacheRepository {
  constructor(@Inject('CACHE_MANAGER') private readonly cache: Cache) {}

  private userKey(userId: string) {
    return `transactions:user:${userId}`;
  }

  private restaurantKey(restaurantId: string) {
    return `transactions:restaurant:${restaurantId}`;
  }

  async saveForUser(userId: string, transaction: TransactionEntity): Promise<void> {
    const key = this.userKey(userId);
    const existing = (await this.cache.get<TransactionEntity[]>(key)) || [];
    const updated = [...existing.filter((t) => t.id !== transaction.id), transaction];
    await this.cache.set(key, updated);
  }

  async saveForRestaurant(restaurantId: string, transaction: TransactionEntity): Promise<void> {
    const key = this.restaurantKey(restaurantId);
    const existing = (await this.cache.get<TransactionEntity[]>(key)) || [];
    const updated = [...existing.filter((t) => t.id !== transaction.id), transaction];
    await this.cache.set(key, updated);
  }

  async getByUser(userId: string): Promise<TransactionEntity[]> {
    const key = this.userKey(userId);
    return (await this.cache.get<TransactionEntity[]>(key)) || [];
  }

  async getByRestaurant(restaurantId: string): Promise<TransactionEntity[]> {
    const key = this.restaurantKey(restaurantId);
    return (await this.cache.get<TransactionEntity[]>(key)) || [];
  }

  async clearUserTransactions(userId: string): Promise<void> {
    await this.cache.del(this.userKey(userId));
  }

  async clearRestaurantTransactions(restaurantId: string): Promise<void> {
    await this.cache.del(this.restaurantKey(restaurantId));
  }
}
