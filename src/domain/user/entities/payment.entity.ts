// src/domain/entity/payment.entity.ts

import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { OrderEntity } from './order.entity';

export enum PaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  WALLET = 'WALLET',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

@ObjectType() // 👈 GraphQL object type
@Entity() // 👈 MikroORM entity
export class PaymentEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique, time-sortable ID

  @OneToOne(() => OrderEntity)
  order: OrderEntity; // 🔗 Related order

  @Field(() => Float)
  @Property()
  amount: number; // 💰 Final paid amount (after discount + delivery + tax)

  @Field(() => PaymentMethod)
  @Property()
  method: PaymentMethod; // 💳 Payment method used

  @Field(() => PaymentStatus)
  @Property({ default: PaymentStatus.PENDING })
  status: PaymentStatus = PaymentStatus.PENDING; // 🧾 Payment state

  @Field({ nullable: true })
  @Property({ nullable: true })
  paymentGateway?: string; // 🌐 e.g. 'stripe', 'razorpay', 'paypal'

  @Field({ nullable: true })
  @Property({ nullable: true })
  providerTransactionId?: string; // 🔗 Reference ID from payment gateway

  @Field({ nullable: true })
  @Property({ nullable: true })
  errorMessage?: string; // ❌ Failure reason (if any)

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 Timestamp when record was created

  @Field({ nullable: true })
  @Property({ type: 'date', nullable: true })
  paidAt?: Date; // 💸 When the payment succeeded

  @Field({ nullable: true })
  @Property({ type: 'date', nullable: true })
  refundedAt?: Date; // 🔁 When the refund was issued (if any)
}
