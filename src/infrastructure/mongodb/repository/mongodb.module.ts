// src/infrastructure/mongodb/mongodb.module.ts

import { Module } from '@nestjs/common';

// MongoDB repository implementations
import { NotificationRepository } from './notification.repository.impl';
import { SupportMessageRepository } from './support-message.repository.impl';

@Module({
  providers: [NotificationRepository, SupportMessageRepository],
  exports: [NotificationRepository, SupportMessageRepository],
})
export class MongoInfrastructureModule {}
