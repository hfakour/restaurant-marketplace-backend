// src/domain/enums/transaction-status.enum.ts
import { registerEnumType } from '@nestjs/graphql';

/**
 * Status of a financial transaction.
 */
export enum TransactionStatus {
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
  description: 'Status of a financial transaction',
});
