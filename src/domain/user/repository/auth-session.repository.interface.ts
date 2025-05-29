import { AuthSession } from '../entities/auth.entity';

export abstract class IAuthSessionRepository {
  abstract findByToken(token: string): Promise<AuthSession | null>;
  abstract findByRefreshToken(refreshToken: string): Promise<AuthSession | null>;
  abstract findByUserId(userId: string): Promise<AuthSession[]>;
  abstract create(session: AuthSession): Promise<void>;
  abstract revoke(id: string): Promise<void>;
}
