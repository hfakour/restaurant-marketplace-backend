import { UserEntity } from '../entity/user.entity';
import { UserId } from 'src/domain/types/entity-types';

/**
 * Repository contract for User cache (domain layer).
 * Used for offline support, fast lookups, and pending update syncing.
 */
export interface IUserCacheRepository {
  /**
   * Save a user entity to the cache.
   * @param user - User entity to cache.
   * @param ttl - Optional time-to-live in seconds.
   */
  save(user: UserEntity, ttl?: number): Promise<void>;

  /**
   * Retrieve a user entity from cache by user ID.
   */
  get(userId: UserId): Promise<UserEntity | null>;

  /**
   * Delete a user entity from cache by user ID.
   */
  delete(userId: UserId): Promise<void>;

  /**
   * Save a pending update for a user (for later syncing).
   */
  savePendingUpdate(user: UserEntity): Promise<void>;

  /**
   * Retrieve a pending user update (offline edits, etc).
   */
  getPendingUpdate(userId: UserId): Promise<UserEntity | null>;

  /**
   * Clear a pending update for a user after syncing.
   */
  clearPendingUpdate(userId: UserId): Promise<void>;
}
