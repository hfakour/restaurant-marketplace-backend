import { UserId } from 'src/domain/types/entity-types';
import { SessionToken } from '../types/cache/cache-types';

/**
 * Repository contract for session token caching (domain layer).
 */
export interface ISessionCacheRepository {
  /**
   * Retrieve the session token for a given user.
   * @returns SessionToken or null if not set.
   */
  findByUserId(userId: UserId): Promise<SessionToken | null>;

  /**
   * Store or update the session token for a user.
   */
  save(userId: UserId, token: SessionToken): Promise<void>;

  /**
   * Delete the session token for a user.
   */
  delete(userId: UserId): Promise<void>;
}
