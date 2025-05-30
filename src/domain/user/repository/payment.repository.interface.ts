import { PaymentId, PaymentOrderId } from 'src/domain/types/entity-ids';
import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentRepository {
  findById(id: PaymentId): Promise<PaymentEntity | null>;
  findByOrderId(orderId: PaymentOrderId): Promise<PaymentEntity | null>;
  save(payment: PaymentEntity): Promise<void>;
  update(payment: PaymentEntity): Promise<void>;
  delete(id: PaymentId): Promise<void>;
}
