// src/domain/enums/notification-type.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  ORDER = 'ORDER',
  RESERVATION = 'RESERVATION',
  PROMOTION = 'PROMOTION',
  GENERAL = 'GENERAL',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
});
