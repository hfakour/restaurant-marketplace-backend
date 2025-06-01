// src/infrastructure/database/repositories/coupon.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { CouponEntity } from 'src/domain/entities/coupon.entity';
import { ICouponRepository } from 'src/domain/repository/coupon.repository.interface';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

@Injectable()
export class CouponRepository implements ICouponRepository {
  constructor(
    @InjectRepository(CouponEntity, 'default')
    private readonly couponRepo: EntityRepository<CouponEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find coupon by its unique code (e.g., SAVE10)
  async findByCode(code: CouponEntity['code']): Promise<CouponEntity | null> {
    return await this.couponRepo.findOne({ code });
  }

  // 🔍 Find all active coupons that belong to a specific restaurant
  async findActiveByRestaurantId(restaurantId: Restaurant['id']): Promise<CouponEntity[]> {
    return await this.couponRepo.find({
      restaurant: { id: restaurantId },
      isActive: true,
      startDate: { $lte: new Date() }, // Already started
      endDate: { $gte: new Date() }, // Not expired
    });
  }

  // 🔍 Find all active coupons that apply globally (not tied to a specific restaurant)
  async findGlobalCoupons(): Promise<CouponEntity[]> {
    return await this.couponRepo.find({
      isActive: true,
      applicableRestaurants: { $eq: [] }, // Empty collection means global
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    });
  }

  // ➕ Create a new coupon
  async create(coupon: CouponEntity): Promise<void> {
    this.em.persist(coupon);
    await this.em.flush();
  }

  // 🔄 Update an existing coupon
  async update(coupon: CouponEntity): Promise<void> {
    this.em.persist(coupon);
    await this.em.flush();
  }

  // ❌ Delete a coupon by its ID
  async delete(id: CouponEntity['id']): Promise<void> {
    const coupon = await this.couponRepo.findOne({ id });
    if (coupon) {
      this.em.remove(coupon);
      await this.em.flush();
    }
  }
}
