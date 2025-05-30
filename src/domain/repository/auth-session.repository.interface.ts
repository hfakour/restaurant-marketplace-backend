import { AuthSessionId, AuthUserId, RefreshToken, Token } from 'src/domain/types/entity-types';
import { AuthSession } from '../entities/auth.entity';

export abstract class IAuthSessionRepository {
  abstract findByToken(token: Token): Promise<AuthSession | null>;
  abstract findByRefreshToken(refreshToken: RefreshToken): Promise<AuthSession | null>;
  abstract findByUserId(userId: AuthUserId): Promise<AuthSession[]>;
  abstract create(session: AuthSession): Promise<void>;
  abstract revoke(id: AuthSessionId): Promise<void>;
}
