// src/domain/enums/notification-type.enum.ts
import { registerEnumType } from "@nestjs/graphql";

/**
 * Types of notifications sent to users.
 */
export enum NotificationType {
  ORDER = "ORDER",
  RESERVATION = "RESERVATION",
  PROMOTION = "PROMOTION",
  GENERAL = "GENERAL",
}

registerEnumType(NotificationType, {
  name: "NotificationType",
  description: "Types of notifications sent to users",
});
