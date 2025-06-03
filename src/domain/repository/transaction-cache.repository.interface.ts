import { TransactionEntity } from 'src/domain/entity/transaction.entity';
import { TransactionUserId, TransactionRestaurantId } from 'src/domain/types/entity-types';

/**
 * Repository contract for transaction caching (domain layer).
 */
export interface ITransactionCacheRepository {
  /**
   * Save a transaction to the user's transaction cache.
   */
  saveForUser(userId: TransactionUserId, transaction: TransactionEntity): Promise<void>;

  /**
   * Save a transaction to the restaurant's transaction cache.
   */
  saveForRestaurant(
    restaurantId: TransactionRestaurantId,
    transaction: TransactionEntity,
  ): Promise<void>;

  /**
   * Retrieve all cached transactions for a user.
   */
  getByUser(userId: TransactionUserId): Promise<TransactionEntity[]>;

  /**
   * Retrieve all cached transactions for a restaurant.
   */
  getByRestaurant(restaurantId: TransactionRestaurantId): Promise<TransactionEntity[]>;

  /**
   * Clear all cached transactions for a user.
   */
  clearUserTransactions(userId: TransactionUserId): Promise<void>;

  /**
   * Clear all cached transactions for a restaurant.
   */
  clearRestaurantTransactions(restaurantId: TransactionRestaurantId): Promise<void>;
}
