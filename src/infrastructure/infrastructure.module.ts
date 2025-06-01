// src/infrastructure/infrastructure.module.ts

import { Module } from '@nestjs/common';

import { MongoInfrastructureModule } from './mongodb/repository/mongodb.module';
import { PostgresInfrastructureModule } from './postgres/postgres.module';
import { RedisInfrastructureModule } from './redis/redis.module';

@Module({
  imports: [MongoInfrastructureModule, PostgresInfrastructureModule, RedisInfrastructureModule],
  exports: [MongoInfrastructureModule, PostgresInfrastructureModule, RedisInfrastructureModule],
})
export class InfrastructureModule {}
