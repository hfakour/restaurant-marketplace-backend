import { CouponEntity } from '../entities/coupon.entity';

export abstract class ICouponRepository {
  abstract findByCode(code: string): Promise<CouponEntity | null>;
  abstract findActiveByRestaurantId(restaurantId: string): Promise<CouponEntity[]>;
  abstract findGlobalCoupons(): Promise<CouponEntity[]>;
  abstract create(coupon: CouponEntity): Promise<void>;
  abstract update(coupon: CouponEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
