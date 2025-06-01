// src/domain/repository/session-cache.repository.interface.ts

import { SessionToken, UserId } from 'src/domain/types/entity-types';

export interface ISessionCacheRepository {
  findByUserId(userId: UserId): Promise<SessionToken | null>;
  save(userId: UserId, token: SessionToken): Promise<void>;
  delete(userId: UserId): Promise<void>;
}
