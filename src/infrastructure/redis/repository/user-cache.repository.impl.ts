// src/infrastructure/redis/user-cache.repository.impl.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { IUserCacheRepository } from 'src/domain/repository/user-cache.repository.interface';
import { UserId } from 'src/domain/types/entity-types';
import { UserCache } from 'src/domain/types/cache/cache-types';

@Injectable()
export class UserCacheRepository implements IUserCacheRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  private getKey(userId: UserId): string {
    return `user:${userId}`;
  }

  async findById(userId: UserId): Promise<UserCache | null> {
    const raw = await this.cache.get<string>(this.getKey(userId));
    return raw ? (JSON.parse(raw) as UserCache) : null;
  }

  async save(userId: UserId, data: UserCache): Promise<void> {
    const ttl = 3600; // 1 hour
    await this.cache.set(this.getKey(userId), JSON.stringify(data), ttl);
  }

  async delete(userId: UserId): Promise<void> {
    await this.cache.del(this.getKey(userId));
  }
}
