// ✅ Enum to define user roles clearly and consistently
import { registerEnumType } from '@nestjs/graphql';

export enum TransactionStatus {
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

// ✅ Register enum for GraphQL
registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
});
