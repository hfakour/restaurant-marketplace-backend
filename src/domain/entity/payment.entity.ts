import { Entity, PrimaryKey, Property, OneToOne, Enum, Index } from '@mikro-orm/core';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { OrderEntity } from './order.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@ObjectType()
@Entity()
export class PaymentEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' }) // Enforce UUID in DB
  id: string = uuidv7();

  @Field(() => OrderEntity)
  @OneToOne(() => OrderEntity, { nullable: false })
  @Index() // Fast lookup by order
  order: OrderEntity;

  @Field(() => Float)
  @Property()
  amount: number;

  @Field(() => PaymentMethod)
  @Enum(() => PaymentMethod)
  method: PaymentMethod;

  @Field(() => PaymentStatus)
  @Enum(() => PaymentStatus)
  @Property({ default: PaymentStatus.PENDING })
  @Index() // For dashboard filters
  status: PaymentStatus = PaymentStatus.PENDING;

  @Field({ nullable: true })
  @Property({ nullable: true })
  paymentGateway?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  providerTransactionId?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  errorMessage?: string;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  @Index() // For reporting/sorting
  createdAt: Date = new Date();

  @Field({ nullable: true })
  @Property({ type: 'date', nullable: true })
  @Index() // For revenue reports
  paidAt?: Date;

  @Field({ nullable: true })
  @Property({ type: 'date', nullable: true })
  refundedAt?: Date;
}
