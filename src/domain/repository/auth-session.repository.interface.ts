import { AuthSessionId, AuthUserId, RefreshToken, Token } from 'src/domain/types/entity-types';
import { AuthSession } from '../entities/auth.entity';

export interface IAuthSessionRepository {
  findByToken(token: Token): Promise<AuthSession | null>;
  findByRefreshToken(refreshToken: RefreshToken): Promise<AuthSession | null>;
  findByUserId(userId: AuthUserId): Promise<AuthSession[]>;
  create(session: AuthSession): Promise<void>;
  revoke(id: AuthSessionId): Promise<void>;
}
