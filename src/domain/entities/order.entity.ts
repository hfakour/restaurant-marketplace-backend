// src/domain/entity/order.entity.ts

import {
  Entity, // 📦 MikroORM: declares a persistent entity/table
  PrimaryKey, // 🗝️ Primary key decorator
  Property, // 🏷️ Persisted property/column decorator
  ManyToOne, // 🔗 Many-to-one relationship
  OneToMany, // 🔗 One-to-many relationship
  OneToOne, // 🔗 One-to-one relationship
  Collection, // 🧺 Wrapper for one-to-many/many-to-many collections
  Enum, // 🎛️ MikroORM: enum persistence
} from "@mikro-orm/core";
import {
  ObjectType, // 📦 Expose this class as a GraphQL object type
  Field, // 📢 Expose fields in GraphQL schema
  ID, // 🆔 GraphQL: ID type
  Float, // 🔢 GraphQL: float type
} from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid"; // 🔑 For time-sortable, unique IDs

import { PaymentEntity } from "./payment.entity"; // 🔗 Payment details (if paid)
import { UserEntity } from "./user.entity"; // 🔗 Ordering user
import { RestaurantEntity } from "./restaurant.entity"; // 🔗 Restaurant being ordered from
import { OrderItemEntity } from "./order-item.entity"; // 🔗 Individual order items
import { AddressEntity } from "./address.entity"; // 🔗 Delivery address
import { OrderStatus } from "../enums/order-status.enum"; // 🎛️ Enum for order status
import { PaymentMethod } from "../enums/payment-method.enum"; // 🎛️ Enum for payment method
import { CouponEntity } from "./coupon.entity"; // 🔗 Coupon applied (if any)

@ObjectType() // 📦 Expose this entity to the GraphQL schema
@Entity() // 🏷️ MikroORM persistent table
export class OrderEntity {
  @Field(() => ID) // 📢 Expose ID as GraphQL ID type
  @PrimaryKey({ type: "uuid" }) // 🗝️ UUIDv7 for uniqueness/sortability
  id: string = uuidv7(); // ➡️ Generate new UUID for each order

  @Field(() => UserEntity) // 📢 Expose user in GraphQL
  @ManyToOne(() => UserEntity) // 🔗 Many orders can belong to one user
  user: UserEntity; // 🧑 Who placed the order

  @Field(() => RestaurantEntity) // 📢 Expose restaurant in GraphQL
  @ManyToOne(() => RestaurantEntity) // 🔗 Many orders can reference the same restaurant
  restaurant: RestaurantEntity; // 🍽️ Restaurant being ordered from

  @Field(() => AddressEntity) // 📢 Expose address in GraphQL
  @ManyToOne(() => AddressEntity) // 🔗 Many orders can share an address
  deliveryAddress: AddressEntity; // 🏠 Delivery address

  @Field(() => [OrderItemEntity]) // 📢 Expose items in GraphQL
  @OneToMany(() => OrderItemEntity, (item) => item.order)
  // 🔗 One order can have many items (inverse is item.order)
  items = new Collection<OrderItemEntity>(this); // 📦 Ordered food items

  @Field(() => Float) // 📢 Expose subtotal in GraphQL
  @Property() // 🏷️ Persist as DB column
  subtotal: number; // 💵 Sum of item prices (before tax/fees)

  @Field(() => Float) // 📢 Expose tax in GraphQL
  @Property() // 🏷️ Persist as DB column
  tax: number; // 🧾 Tax on subtotal

  @Field(() => Float) // 📢 Expose deliveryFee in GraphQL
  @Property() // 🏷️ Persist as DB column
  deliveryFee: number; // 🚚 Delivery charge

  @Field(() => Float) // 📢 Expose total in GraphQL
  @Property() // 🏷️ Persist as DB column
  total: number; // 💰 subtotal + tax + deliveryFee

  @Field(() => OrderStatus) // 📢 Expose order status in GraphQL
  @Enum(() => OrderStatus) // 🎛️ Store as enum in DB
  status: OrderStatus = OrderStatus.PENDING; // 📦 Current status (default PENDING)

  @Field({ nullable: true }) // 📢 Expose notes in GraphQL (nullable)
  @Property({ nullable: true }) // 🏷️ Optional DB column
  notes?: string; // ✍️ Optional special instructions

  @Field(() => PaymentMethod) // 📢 Expose payment method in GraphQL
  @Property({ type: "string" }) // 🏷️ Store as string in DB
  paymentMethod: PaymentMethod; // 💳 How was payment made

  @Field(() => PaymentEntity, { nullable: true }) // 📢 Expose payment in GraphQL (nullable)
  @OneToOne(() => PaymentEntity, (payment) => payment.order, { nullable: true })
  // 🔗 One order can have one payment entity (nullable if not yet paid)
  payment?: PaymentEntity; // 💳 Payment entity (details, status, receipts)

  @Field() // 📢 Expose isPaid in GraphQL
  @Property({ default: false }) // 🏷️ Default value in DB
  isPaid: boolean = false; // ✅ Has payment been completed?

  @Field(() => CouponEntity, { nullable: true }) // 📢 Expose coupon in GraphQL (nullable)
  @ManyToOne(() => CouponEntity, { nullable: true })
  // 🔗 Many orders can use the same coupon
  coupon?: CouponEntity; // 🎟️ Coupon applied (if any)

  @Field() // 📢 Expose creation time in GraphQL
  @Property({ type: "date", onCreate: () => new Date() })
  // 🏷️ Set on entity creation
  createdAt: Date = new Date(); // 📅 When was the order placed?

  @Field() // 📢 Expose last update time in GraphQL
  @Property({ type: "date", onUpdate: () => new Date() })
  // 🏷️ Auto-updated on entity changes
  updatedAt: Date = new Date(); // 🕒 Last updated
}
