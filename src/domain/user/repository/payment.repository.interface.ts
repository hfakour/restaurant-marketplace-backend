import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentRepository {
  findById(id: string): Promise<PaymentEntity | null>;
  findByOrderId(orderId: string): Promise<PaymentEntity | null>;
  save(payment: PaymentEntity): Promise<void>;
  update(payment: PaymentEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
