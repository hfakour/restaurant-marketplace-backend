import { PaymentId, PaymentOrderId } from 'src/domain/types/entity-types';
import { PaymentEntity } from '../entity/payment.entity';

/**
 * Repository contract for Payment entity (domain layer).
 */
export interface IPaymentRepository {
  /**
   * Find a payment by its unique ID.
   */
  findById(id: PaymentId): Promise<PaymentEntity | null>;

  /**
   * Find a payment by its related order ID.
   */
  findByOrderId(orderId: PaymentOrderId): Promise<PaymentEntity | null>;

  /**
   * Create a new payment and return the created entity.
   */
  create(payment: PaymentEntity): Promise<PaymentEntity>;

  /**
   * Update an existing payment and return the updated entity.
   */
  update(payment: PaymentEntity): Promise<PaymentEntity>;

  /**
   * Delete a payment by its ID.
   */
  delete(id: PaymentId): Promise<void>;
}
