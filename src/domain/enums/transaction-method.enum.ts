// src/domain/enums/transaction-method.enum.ts
import { registerEnumType } from "@nestjs/graphql";

/**
 * Method used for transactions.
 */
export enum TransactionMethod {
  CARD = "CARD",
  CASH = "CASH",
  WALLET = "WALLET",
}

registerEnumType(TransactionMethod, {
  name: "TransactionMethod",
  description: "Method used for transactions",
});
