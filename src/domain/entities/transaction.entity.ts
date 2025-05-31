// src/domain/entity/transaction.entity.ts
import { Property, PrimaryKey, ManyToOne, Enum } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { User } from './user.entity';
import { OrderEntity } from './order.entity';
import { TransactionStatus } from './transaction-status.enum';
import { TransactionMethod } from './transaction-method.enum';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7();

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => OrderEntity, { nullable: true })
  @ManyToOne(() => OrderEntity, { nullable: true })
  order?: OrderEntity;

  @Field(() => Float)
  @Property()
  amount: number;

  @Field(() => TransactionStatus)
  @Enum(() => TransactionStatus)
  status: TransactionStatus;

  @Field(() => TransactionMethod)
  @Enum(() => TransactionMethod)
  method: TransactionMethod;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  constructor(amount: number, status: TransactionStatus, method: TransactionMethod) {
    this.amount = amount;
    this.status = status;
    this.method = method;
  }
}
