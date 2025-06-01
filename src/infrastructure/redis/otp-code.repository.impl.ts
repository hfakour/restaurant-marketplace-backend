// src/infrastructure/redis/otp-code.repository.impl.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { IOtpCodeRepository } from 'src/domain/repository/otp-code.repository.interface';
import { OtpCode, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class OtpCodeRepository implements IOtpCodeRepository {
  constructor(
    @Inject()
    private readonly cache: Cache,
  ) {}

  private getKey(userId: UserId): string {
    return `otp:${userId}`;
  }

  async findByUserId(userId: UserId): Promise<OtpCode | null> {
    return (await this.cache.get<OtpCode>(this.getKey(userId))) ?? null;
  }

  async save(userId: UserId, code: OtpCode): Promise<void> {
    const ttl = 300; // 5 minutes
    await this.cache.set(this.getKey(userId), code, ttl);
  }

  async delete(userId: UserId): Promise<void> {
    await this.cache.del(this.getKey(userId));
  }
}
