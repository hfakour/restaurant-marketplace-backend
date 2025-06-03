import { CouponCode, CouponId, CouponRestaurantId } from 'src/domain/types/entity-types';
import { CouponEntity } from '../entity/coupon.entity';

/**
 * Repository contract for Coupon entity (domain layer).
 */
export interface ICouponRepository {
  /**
   * Find a coupon by its unique code.
   */
  findByCode(code: CouponCode): Promise<CouponEntity | null>;

  /**
   * Find all currently active coupons for a given restaurant.
   */
  findActiveByRestaurantId(restaurantId: CouponRestaurantId): Promise<CouponEntity[]>;

  /**
   * Find all global (platform-wide) coupons.
   */
  findGlobalCoupons(): Promise<CouponEntity[]>;

  /**
   * Persist a new coupon and return the saved entity.
   */
  create(coupon: CouponEntity): Promise<CouponEntity>;

  /**
   * Update an existing coupon and return the updated entity.
   */
  update(coupon: CouponEntity): Promise<CouponEntity>;

  /**
   * Delete a coupon by its unique ID.
   */
  delete(id: CouponId): Promise<void>;
}
