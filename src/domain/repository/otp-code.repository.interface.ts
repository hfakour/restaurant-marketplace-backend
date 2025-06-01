// src/domain/repository/otp-code.repository.interface.ts

import { OtpCode, UserId } from 'src/domain/types/entity-types';

export interface IOtpCodeRepository {
  findByUserId(userId: UserId): Promise<OtpCode | null>;
  save(userId: UserId, code: OtpCode): Promise<void>;
  delete(userId: UserId): Promise<void>;
}
