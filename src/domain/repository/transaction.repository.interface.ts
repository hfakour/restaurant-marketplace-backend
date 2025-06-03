import {
  TransactionId,
  TransactionRestaurantId,
  TransactionUserId,
} from 'src/domain/types/entity-types';
import { TransactionEntity } from '../entity/transaction.entity';

/**
 * Repository contract for Transaction entity (domain layer).
 */
export interface ITransactionRepository {
  /**
   * Find a transaction by its unique ID.
   */
  findById(id: TransactionId): Promise<TransactionEntity | null>;

  /**
   * Find all transactions for a specific user.
   */
  findByUserId(userId: TransactionUserId): Promise<TransactionEntity[]>;

  /**
   * Find all transactions for a specific restaurant.
   */
  findByRestaurantId(restaurantId: TransactionRestaurantId): Promise<TransactionEntity[]>;

  /**
   * Create a new transaction and return the created entity.
   */
  create(transaction: TransactionEntity): Promise<TransactionEntity>;

  /**
   * Update an existing transaction and return the updated entity.
   */
  update(transaction: TransactionEntity): Promise<TransactionEntity>;

  /**
   * Delete a transaction by its ID.
   */
  delete(id: TransactionId): Promise<void>;

  /**
   * Check if a transaction exists by its ID.
   */
  existsById(id: TransactionId): Promise<boolean>;
}
