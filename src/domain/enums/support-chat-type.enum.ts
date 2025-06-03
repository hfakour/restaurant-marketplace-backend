// src/domain/enums/support-chat-type.enum.ts
import { registerEnumType } from '@nestjs/graphql';

/**
 * Chat participant types for support messaging.
 */
export enum SupportChatType {
  USER_TO_RESTAURANT = 'USER_TO_RESTAURANT',
  USER_TO_SUPPORT = 'USER_TO_SUPPORT',
  RESTAURANT_TO_SUPPORT = 'RESTAURANT_TO_SUPPORT',
}

registerEnumType(SupportChatType, {
  name: 'SupportChatType',
  description: 'Chat participant types for support messaging',
});
