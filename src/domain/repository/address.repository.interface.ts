import { Address } from '../entities/address.enitity';
import { AddressId, RestaurantId, AddressRestaurantId } from 'src/domain/types/entity-types';

export interface IAddressRepository {
  findById(id: AddressId): Promise<Address | null>;
  findByUserId(userId: AddressRestaurantId): Promise<Address[]>;
  findByRestaurantId(restaurantId: RestaurantId): Promise<Address | null>;
  create(address: Address): Promise<void>;
  update(address: Address): Promise<void>;
  delete(id: AddressId): Promise<void>;
}
