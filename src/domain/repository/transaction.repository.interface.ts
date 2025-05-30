import { TransactionId, TransactionUserId } from 'src/domain/types/entity-types';
import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  findById(id: TransactionId): Promise<Transaction | null>;
  findByUserId(userId: TransactionUserId): Promise<Transaction[]>;
  create(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  delete(id: TransactionId): Promise<void>;
  existsById(id: TransactionId): Promise<boolean>;
}
