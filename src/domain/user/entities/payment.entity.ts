// src/domain/entity/payment.entity.ts

import { Entity, PrimaryKey, Property, OneToOne, Enum } from '@mikro-orm/core';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { OrderEntity } from './order.entity';
import { PaymentMethod } from './payment-method.enum';
import { PaymentStatus } from './payment-status.enum';

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
  @Enum(() => PaymentMethod)
  method: PaymentMethod; // 💳 Will map to Postgres enum "payment_method"

  @Field(() => PaymentStatus)
  @Enum(() => PaymentStatus) // ✅ Only the enum type here
  @Property({ default: PaymentStatus.PENDING }) // ✅ Default value goes in @Property
  status: PaymentStatus = PaymentStatus.PENDING;

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
