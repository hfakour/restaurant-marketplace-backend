// src/domain/enums/payment-method.enum.ts
import { registerEnumType } from "@nestjs/graphql";

/**
 * Supported payment methods.
 */
export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
  WALLET = "WALLET",
}

registerEnumType(PaymentMethod, {
  name: "PaymentMethod",
  description: "Supported payment methods",
});
