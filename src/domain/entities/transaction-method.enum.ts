// ✅ Enum to define user roles clearly and consistently
import { registerEnumType } from '@nestjs/graphql';

export enum TransactionMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  WALLET = 'WALLET',
}

// ✅ Register enum for GraphQL
registerEnumType(TransactionMethod, {
  name: 'TransactionMethod',
});
