import { Address } from '../entities/address.enitity';
import { AddressId, RestaurantId, AddressRestaurantId } from 'src/domain/types/entity-ids';

export abstract class IAddressRepository {
  abstract findById(id: AddressId): Promise<Address | null>;
  abstract findByUserId(userId: AddressRestaurantId): Promise<Address[]>;
  abstract findByRestaurantId(restaurantId: RestaurantId): Promise<Address | null>;
  abstract create(address: Address): Promise<void>;
  abstract update(address: Address): Promise<void>;
  abstract delete(id: AddressId): Promise<void>;
}
