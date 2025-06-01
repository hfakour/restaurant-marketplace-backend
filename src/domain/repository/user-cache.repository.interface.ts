// src/domain/repository/user-cache.repository.interface.ts

import { UserCache, UserId } from 'src/domain/types/entity-types';

export interface IUserCacheRepository {
  findById(userId: UserId): Promise<UserCache | null>;
  save(userId: UserId, data: UserCache): Promise<void>;
  delete(userId: UserId): Promise<void>;
}
