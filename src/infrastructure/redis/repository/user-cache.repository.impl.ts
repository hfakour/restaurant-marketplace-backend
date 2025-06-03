import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { UserId } from 'src/domain/types/entity-types';
import { IUserCacheRepository } from 'src/domain/repository/user-cache.repository.interface';
import { UserEntity } from 'src/domain/entity/user.entity';
import { UserCacheMapper } from 'src/domain/types/cache/user/user-cache.mapper';

@Injectable()
export class UserCacheRepository implements IUserCacheRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  private getUserKey(userId: UserId) {
    return `user:${userId}`;
  }

  private getPendingUpdateKey(userId: UserId) {
    return `user:${userId}:pending`;
  }

  async save(user: UserEntity, ttl = 3600): Promise<void> {
    const key = this.getUserKey(user.id);
    const cacheModel = UserCacheMapper.toCacheModel(user);
    await this.cache.set(key, cacheModel, ttl);
  }

  async get(userId: UserId): Promise<UserEntity | null> {
    const key = this.getUserKey(userId);
    const cached = await this.cache.get<ReturnType<typeof UserCacheMapper.toCacheModel>>(key);
    return cached ? UserCacheMapper.fromCacheModel(cached) : null;
  }

  async delete(userId: UserId): Promise<void> {
    const key = this.getUserKey(userId);
    await this.cache.del(key);
  }

  async savePendingUpdate(user: UserEntity): Promise<void> {
    const key = this.getPendingUpdateKey(user.id);
    const cacheModel = UserCacheMapper.toCacheModel(user);
    await this.cache.set(key, cacheModel);
  }

  async getPendingUpdate(userId: UserId): Promise<UserEntity | null> {
    const key = this.getPendingUpdateKey(userId);
    const cached = await this.cache.get<ReturnType<typeof UserCacheMapper.toCacheModel>>(key);
    return cached ? UserCacheMapper.fromCacheModel(cached) : null;
  }

  async clearPendingUpdate(userId: UserId): Promise<void> {
    const key = this.getPendingUpdateKey(userId);
    await this.cache.del(key);
  }
}
