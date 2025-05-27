// src/domain/entity/order.entity.ts

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  OneToOne,
  Collection,
} from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { PaymentEntity } from './payment.entity';

import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { OrderItemEntity } from './order-item.entity';
import { Address } from './address.enitity';
import { OrderStatus } from './order-status.enum';
import { PaymentMethod } from './payment-method.enum';
import { CouponEntity } from './coupon.entity';

@ObjectType()
@Entity()
export class OrderEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique order ID

  @Field(() => User)
  @ManyToOne(() => User)
  user: User; // 🧑 Who placed the order

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant; // 🍽️ Restaurant being ordered from

  @Field(() => Address)
  @ManyToOne(() => Address)
  deliveryAddress: Address; // 🏠 Delivery location

  @Field(() => [OrderItemEntity])
  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items = new Collection<OrderItemEntity>(this); // 📦 Items in the order

  @Field(() => Float)
  @Property()
  subtotal: number; // 💵 Sum of item prices

  @Field(() => Float)
  @Property()
  tax: number; // 🧾 Tax on subtotal

  @Field(() => Float)
  @Property()
  deliveryFee: number; // 🚚 Delivery charge

  @Field(() => Float)
  @Property()
  total: number; // 💰 subtotal + tax + deliveryFee

  @Field(() => OrderStatus)
  @Property({ type: 'string' })
  status: OrderStatus = OrderStatus.PENDING; // 📦 Current status

  @Field({ nullable: true })
  @Property({ nullable: true })
  notes?: string; // ✍️ Optional special instructions

  @Field(() => PaymentMethod)
  @Property({ type: 'string' })
  paymentMethod: PaymentMethod; // 💳 How payment was made

  @Field(() => PaymentEntity, { nullable: true })
  @OneToOne(() => PaymentEntity, (payment) => payment.order, { nullable: true })
  payment?: PaymentEntity;

  @Field()
  @Property()
  isPaid: boolean = false; // ✅ Whether payment is done

  @Field(() => CouponEntity, { nullable: true })
  @ManyToOne(() => CouponEntity, { nullable: true })
  coupon?: CouponEntity; // ✅ Coupon applied to this order

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 Order creation timestamp

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // 🕒 Last updated timestamp
}
