// src/domain/entity/coupon.entity.ts

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Collection,
  Index,
} from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { RestaurantEntity } from './restaurant.entity';
import { OrderEntity } from './order.entity';

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

@ObjectType()
@Entity()
export class CouponEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' }) // Use UUIDv7 for sortable, scalable IDs
  id: string = uuidv7();

  @Field()
  @Property({ unique: true })
  @Index() // Fast lookup by code
  code: string; // Unique coupon code

  @Field()
  @Property()
  description: string; // Display text

  @Field(() => CouponType)
  @Property({ type: 'string' })
  type: CouponType; // "FIXED" or "PERCENTAGE"

  @Field(() => Float)
  @Property()
  amount: number; // Discount value

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  minOrderTotal?: number; // Minimum spend required

  @Field()
  @Property({ type: 'date' })
  @Index() // Query for active/expired coupons efficiently
  startDate: Date;

  @Field()
  @Property({ type: 'date' })
  @Index()
  endDate: Date;

  @Field()
  @Property()
  maxUses: number; // Global use limit

  @Field()
  @Property()
  maxUsesPerUser: number; // Per-user limit

  @Field()
  @Property({ default: true })
  isActive: boolean = true; // Can be disabled by admin

  @Field(() => [RestaurantEntity], { nullable: true })
  @ManyToMany(() => RestaurantEntity, undefined, { nullable: true })
  applicableRestaurants = new Collection<RestaurantEntity>(this); // Empty: applies everywhere

  @Field(() => RestaurantEntity)
  @ManyToOne(() => RestaurantEntity)
  @Index() // Query all coupons for a restaurant
  ownerRestaurant: RestaurantEntity; // Owner/creator (renamed for clarity)

  @Field(() => [OrderEntity])
  @OneToMany(() => OrderEntity, (order) => order.coupon)
  ordersUsed = new Collection<OrderEntity>(this); // Track all usage

  @Field() // For GraphQL/admin use
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
