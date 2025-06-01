// src/infrastructure/redis/session-cache.repository.impl.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { ISessionCacheRepository } from 'src/domain/repository/session-cache.repository.interface';
import { SessionToken, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class SessionCacheRepository implements ISessionCacheRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  private getKey(userId: UserId): string {
    return `session:${userId}`;
  }

  async findByUserId(userId: UserId): Promise<SessionToken | null> {
    return (await this.cache.get<SessionToken>(this.getKey(userId))) ?? null;
  }

  async save(userId: UserId, token: SessionToken): Promise<void> {
    const ttl = 60 * 60 * 24 * 7; // 7 days
    await this.cache.set(this.getKey(userId), token, ttl);
  }

  async delete(userId: UserId): Promise<void> {
    await this.cache.del(this.getKey(userId));
  }
}
