import { UserId } from 'src/domain/types/entity-types';
import { OtpCode } from '../types/cache/cache-types';

/**
 * Repository contract for OTP code caching (domain layer).
 */
export interface IOtpCodeRepository {
  /**
   * Find the OTP code for a given user.
   * @returns The OtpCode or null if not set.
   */
  findByUserId(userId: UserId): Promise<OtpCode | null>;

  /**
   * Save or update the OTP code for a user.
   */
  save(userId: UserId, code: OtpCode): Promise<void>;

  /**
   * Delete the OTP code for a user.
   */
  delete(userId: UserId): Promise<void>;
}
