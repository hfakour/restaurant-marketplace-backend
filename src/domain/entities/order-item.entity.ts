// src/domain/entity/order-item.entity.ts

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { OrderEntity } from './order.entity';
import { Food } from './food.entity';
import { GraphQLJSONObject } from 'graphql-scalars';

@ObjectType()
@Entity()
export class OrderItemEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // Unique ID for this item row

  @Field(() => OrderEntity)
  @ManyToOne(() => OrderEntity)
  order: OrderEntity; // 🔗 Back to the parent order

  @Field(() => Food)
  @ManyToOne(() => Food)
  food: Food; // 🍔 What food was ordered

  @Field()
  @Property()
  quantity: number; // 🔢 How many

  @Field(() => Float)
  @Property()
  unitPrice: number; // 💲 Base price per item

  @Field(() => Float)
  @Property()
  totalPrice: number; // 💰 quantity × unitPrice

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Property({ type: 'json', nullable: true })
  selectedExtras?: Record<string, unknown>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Property({ type: 'json', nullable: true })
  selectedCustomizations?: Record<string, unknown>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Property({ type: 'json', nullable: true })
  selectedSize?: Record<string, unknown>;

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
