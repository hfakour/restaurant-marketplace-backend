// src/infrastructure/redis/redis.module.ts

import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

// Redis cache repository implementations
import { SessionCacheRepository } from './repository/session-cache.repository.impl';
import { OtpCodeRepository } from './repository/otp-code.repository.impl';
import { UserCacheRepository } from './repository/user-cache.repository.impl';

@Module({
  imports: [CacheModule.register()], // This makes cache manager injectable
  providers: [SessionCacheRepository, OtpCodeRepository, UserCacheRepository],
  exports: [SessionCacheRepository, OtpCodeRepository, UserCacheRepository],
})
export class RedisInfrastructureModule {}
