import { CouponCode, CouponId, CouponRestaurantId } from 'src/domain/types/entity-types';
import { CouponEntity } from '../entities/coupon.entity';

export abstract class ICouponRepository {
  abstract findByCode(code: CouponCode): Promise<CouponEntity | null>;
  abstract findActiveByRestaurantId(restaurantId: CouponRestaurantId): Promise<CouponEntity[]>;
  abstract findGlobalCoupons(): Promise<CouponEntity[]>;
  abstract create(coupon: CouponEntity): Promise<void>;
  abstract update(coupon: CouponEntity): Promise<void>;
  abstract delete(id: CouponId): Promise<void>;
}
