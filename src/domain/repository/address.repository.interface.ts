import { AddressEntity } from '../entity/address.entity';
import { AddressId, UserId, RestaurantId } from 'src/domain/types/entity-types';

/**
 * Abstract contract for address persistence (Clean Architecture repository).
 */
export interface IAddressRepository {
  /**
   * Find a single address by its unique ID.
   */
  findById(id: AddressId): Promise<AddressEntity | null>;

  /**
   * Find all addresses for a given user.
   */
  findByUserId(userId: UserId): Promise<AddressEntity[]>;

  /**
   * Find all addresses for a given restaurant.
   * (Returns array for multi-branch/chain support.)
   */
  findByRestaurantId(restaurantId: RestaurantId): Promise<AddressEntity[]>;

  /**
   * Persist a new address.
   * Returns the created address for validation/chaining.
   */
  create(address: AddressEntity): Promise<AddressEntity>;

  /**
   * Update an existing address.
   * Returns the updated address.
   */
  update(address: AddressEntity): Promise<AddressEntity>;

  /**
   * Delete an address by ID.
   */
  delete(id: AddressId): Promise<void>;
}
