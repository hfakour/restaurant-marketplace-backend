// src/application/services/coupon.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { ICouponRepository } from 'src/domain/repository/coupon.repository.interface';
import { CouponEntity, CouponType } from 'src/domain/entities/coupon.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

import { CouponId, CouponCode, CouponRestaurantId } from 'src/domain/types/entity-types';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepo: ICouponRepository,
    private readonly em: EntityManager, // 📌 For reference creation
  ) {}

  // ✅ Create a new coupon
  async create(data: {
    code: string;
    description: string;
    type: CouponType;
    amount: number;
    minOrderTotal?: number;
    startDate: Date;
    endDate: Date;
    maxUses: number;
    maxUsesPerUser: number;
    isActive?: boolean;
    applicableRestaurantIds?: string[];
    restaurantId: string;
  }): Promise<void> {
    const restaurantRef = this.em.getReference(Restaurant, data.restaurantId);

    const applicableRestaurants = new Set<Restaurant>();

    // 🍽️ Reference applicable restaurants (optional list)
    if (data.applicableRestaurantIds?.length) {
      for (const id of data.applicableRestaurantIds) {
        applicableRestaurants.add(this.em.getReference(Restaurant, id));
      }
    }

    const coupon = new CouponEntity();
    coupon.code = data.code;
    coupon.description = data.description;
    coupon.type = data.type;
    coupon.amount = data.amount;
    coupon.minOrderTotal = data.minOrderTotal;
    coupon.startDate = data.startDate;
    coupon.endDate = data.endDate;
    coupon.maxUses = data.maxUses;
    coupon.maxUsesPerUser = data.maxUsesPerUser;
    coupon.isActive = data.isActive ?? true;
    coupon.restaurant = restaurantRef;

    // If specific restaurants were passed, add them
    for (const restaurant of applicableRestaurants) {
      coupon.applicableRestaurants.add(restaurant);
    }

    await this.couponRepo.create(coupon);
  }

  // 🔁 Update coupon details
  async update(id: CouponId, update: Partial<Omit<CouponEntity, 'id'>>): Promise<void> {
    const coupon = await this.couponRepo.findByCode(update.code ?? '');
    if (!coupon) throw new Error('Coupon not found');

    // ✅ Apply patches (conditionally)
    Object.assign(coupon, update);

    await this.couponRepo.update(coupon);
  }

  // ❌ Delete a coupon
  async delete(id: CouponId): Promise<void> {
    await this.couponRepo.delete(id);
  }

  // 🔍 Lookup by code (e.g. user enters "SAVE20")
  async getByCode(code: CouponCode): Promise<CouponEntity | null> {
    return this.couponRepo.findByCode(code);
  }

  // 🍽️ List all coupons scoped to a restaurant
  async getByRestaurant(restaurantId: CouponRestaurantId): Promise<CouponEntity[]> {
    return this.couponRepo.findActiveByRestaurantId(restaurantId);
  }

  // 🌍 Fetch global coupons not bound to any restaurant
  async getGlobalCoupons(): Promise<CouponEntity[]> {
    return this.couponRepo.findGlobalCoupons();
  }
}
