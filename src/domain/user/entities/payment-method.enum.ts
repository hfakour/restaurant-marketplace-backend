// src/domain/enum/payment-method.enum.ts

import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  WALLET = 'WALLET',
}

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});
