// src/domain/enums/order-status.enum.ts
import { registerEnumType } from '@nestjs/graphql';

/**
 * Possible statuses for an order.
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Possible statuses for an order',
});
