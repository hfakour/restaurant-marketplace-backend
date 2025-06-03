// src/domain/enums/payment-status.enum.ts
import { registerEnumType } from '@nestjs/graphql';

/**
 * Status of a payment transaction.
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
  description: 'Status of a payment transaction',
});
