// src/domain/entity/order-item.entity.ts

import {
  Entity, // 📦 MikroORM: declare this class as a persistent entity/table
  PrimaryKey, // 🗝️ MikroORM: primary key field
  Property, // 🏷️ MikroORM: marks a persistent column
  ManyToOne, // 🔗 MikroORM: many-to-one relationship
} from '@mikro-orm/core';
import {
  ObjectType, // 📦 NestJS GraphQL: expose this class in the GraphQL schema
  Field, // 📢 NestJS GraphQL: expose a field in the GraphQL schema
  ID, // 🆔 GraphQL: special type for unique IDs
  Float, // 🔢 GraphQL: float type
} from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid'; // 🔑 UUIDv7 for unique, sortable IDs

import { OrderEntity } from './order.entity'; // 🔗 Parent order reference
import { FoodEntity } from './food.entity'; // 🔗 Ordered food reference
import { GraphQLJSONObject } from 'graphql-scalars'; // 📦 GraphQL scalar for JSON fields

@ObjectType() // 📦 Expose this entity to the GraphQL schema
@Entity() // 🏷️ Persist this class as a MikroORM entity/table
export class OrderItemEntity {
  @Field(() => ID) // 📢 Expose as GraphQL ID type
  @PrimaryKey({ type: 'uuid' }) // 🗝️ UUIDv7 as DB primary key
  id: string = uuidv7(); // ➡️ Generate unique, sortable ID

  @Field(() => OrderEntity) // 📢 Expose parent order in GraphQL
  @ManyToOne(() => OrderEntity) // 🔗 Many items can belong to one order
  order: OrderEntity; // 🔗 Reference to parent order

  @Field(() => FoodEntity) // 📢 Expose ordered food in GraphQL
  @ManyToOne(() => FoodEntity) // 🔗 Many items can refer to one food type
  food: FoodEntity; // 🍔 Reference to ordered food

  @Field() // 📢 Expose quantity in GraphQL
  @Property() // 🏷️ Persist in DB
  quantity: number; // 🔢 Number of units for this item

  @Field(() => Float) // 📢 Expose unit price in GraphQL
  @Property() // 🏷️ Persist in DB
  unitPrice: number; // 💲 Single-item price at time of order

  @Field(() => Float) // 📢 Expose total price in GraphQL
  @Property() // 🏷️ Persist in DB
  totalPrice: number; // 💰 quantity × unitPrice (could include extras)

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Property({ type: 'json', nullable: true })
  // 🏷️/📢 Store selected extras as a flexible JSON object; nullable if no extras
  selectedExtras?: Record<string, unknown>; // e.g., { cheese: true, sauce: "bbq" }

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Property({ type: 'json', nullable: true })
  // 🏷️/📢 Store customizations (like "no onion", "extra spicy") as JSON; nullable
  selectedCustomizations?: Record<string, unknown>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Property({ type: 'json', nullable: true })
  // 🏷️/📢 Store selected size option as JSON (for multi-size menu items)
  selectedSize?: Record<string, unknown>;

  @Field() // 📢 Expose creation timestamp in GraphQL
  @Property({ type: 'date', onCreate: () => new Date() })
  // 🏷️ Auto-set by MikroORM on creation
  createdAt: Date = new Date();

  @Field() // 📢 Expose update timestamp in GraphQL
  @Property({ type: 'date', onUpdate: () => new Date() })
  // 🏷️ Auto-updated by MikroORM on entity changes
  updatedAt: Date = new Date();
}
