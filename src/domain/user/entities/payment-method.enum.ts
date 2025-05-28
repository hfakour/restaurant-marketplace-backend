import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  WALLET = 'WALLET',
}

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});
