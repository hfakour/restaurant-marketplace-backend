import {
  AuthSessionId,
  AuthSessionUserId,
  RefreshToken,
  Token,
} from 'src/domain/types/entity-types';
import { AuthSessionEntity } from '../entity/auth.entity';

/**
 * Repository contract for Auth Sessions (Clean Architecture).
 */
export interface IAuthSessionRepository {
  /**
   * Find an active session by access token.
   */
  findByToken(token: Token): Promise<AuthSessionEntity | null>;

  /**
   * Find an active session by refresh token.
   */
  findByRefreshToken(refreshToken: RefreshToken): Promise<AuthSessionEntity | null>;

  /**
   * Find all sessions for a specific user.
   */
  findByUserId(userId: AuthSessionUserId): Promise<AuthSessionEntity[]>;

  /**
   * Create a new auth session and return it.
   */
  create(session: AuthSessionEntity): Promise<AuthSessionEntity>;

  /**
   * Revoke (invalidate) a session by its ID.
   */
  revoke(id: AuthSessionId): Promise<void>;
}
