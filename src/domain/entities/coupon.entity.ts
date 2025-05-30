// src/domain/entity/coupon.entity.ts

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { Restaurant } from './restaurant.entity';
import { OrderEntity } from './order.entity';

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

@ObjectType()
@Entity()
export class CouponEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique ID

  @Field()
  @Property({ unique: true })
  code: string; // 🎟️ Coupon code (e.g., SAVE20)

  @Field()
  @Property()
  description: string; // 📄 Info for display (e.g., "10% off your next order")

  @Field(() => CouponType)
  @Property({ type: 'string' })
  type: CouponType;
  // 💲 Discount type (FIXED or PERCENTAGE)

  @Field(() => Float)
  @Property()
  amount: number; // 💰 Amount (e.g., 10% or $5)

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  minOrderTotal?: number; // 💵 Minimum subtotal to use coupon

  @Field()
  @Property({ type: 'date' })
  startDate: Date; // 🕐 When coupon becomes valid

  @Field()
  @Property({ type: 'date' })
  endDate: Date; // ⏳ Expiration date

  @Field()
  @Property()
  maxUses: number; // 🔁 Global usage limit

  @Field()
  @Property()
  maxUsesPerUser: number; // 🔁 Limit per user

  @Field()
  @Property()
  isActive: boolean = true; // ✅ Can be toggled on/off without deleting

  @Field(() => [Restaurant], { nullable: true })
  @ManyToMany(() => Restaurant, undefined, { nullable: true })
  applicableRestaurants = new Collection<Restaurant>(this); // 🍽️ If empty, coupon applies to all

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @Field(() => [OrderEntity])
  @OneToMany(() => OrderEntity, (order) => order.coupon)
  ordersUsed = new Collection<OrderEntity>(this);

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
