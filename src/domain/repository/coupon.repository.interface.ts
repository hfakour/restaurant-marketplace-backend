import { CouponCode, CouponId, CouponRestaurantId } from 'src/domain/types/entity-types';
import { CouponEntity } from '../entities/coupon.entity';

export interface ICouponRepository {
  findByCode(code: CouponCode): Promise<CouponEntity | null>;
  findActiveByRestaurantId(restaurantId: CouponRestaurantId): Promise<CouponEntity[]>;
  findGlobalCoupons(): Promise<CouponEntity[]>;
  create(coupon: CouponEntity): Promise<void>;
  update(coupon: CouponEntity): Promise<void>;
  delete(id: CouponId): Promise<void>;
}
