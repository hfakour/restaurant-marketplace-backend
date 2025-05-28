import { Transaction } from '../entities/transaction.entity';

export abstract class ITransactionRepository {
  abstract findById(id: string): Promise<Transaction | null>;
  abstract findByUserId(userId: string): Promise<Transaction[]>;
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract update(transaction: Transaction): Promise<Transaction>;
  abstract delete(id: string): Promise<void>;
  abstract existsById(id: string): Promise<boolean>;
}
