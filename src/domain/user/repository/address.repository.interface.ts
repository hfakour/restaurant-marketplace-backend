import { Address } from '../entities/address.enitity';

export abstract class IAddressRepository {
  abstract findById(id: string): Promise<Address | null>;
  abstract findByUserId(userId: string): Promise<Address[]>;
  abstract findByRestaurantId(restaurantId: string): Promise<Address | null>;
  abstract create(address: Address): Promise<void>;
  abstract update(address: Address): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
