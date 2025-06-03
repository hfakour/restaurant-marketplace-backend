import { Entity, Property, PrimaryKey, ManyToOne, Enum, Index } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionMethod } from '../enums/transaction-method.enum';
import { RestaurantEntity } from './restaurant.entity';

@ObjectType()
@Entity()
export class TransactionEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index()
  user: UserEntity;

  @Field(() => RestaurantEntity)
  @ManyToOne(() => RestaurantEntity)
  @Index()
  restaurant: RestaurantEntity;

  @Field(() => OrderEntity, { nullable: true })
  @ManyToOne(() => OrderEntity, { nullable: true })
  @Index()
  order?: OrderEntity;

  @Field(() => Float)
  @Property()
  amount: number;

  @Field(() => TransactionStatus)
  @Enum(() => TransactionStatus)
  @Property({ default: TransactionStatus.PENDING }) // Optional: default if needed
  status: TransactionStatus;

  @Field(() => TransactionMethod)
  @Enum(() => TransactionMethod)
  method: TransactionMethod;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  @Index()
  createdAt: Date = new Date();

  // (Optional, for update tracking)
  // @Field()
  // @Property({ type: 'date', onUpdate: () => new Date() })
  // updatedAt: Date = new Date();

  constructor(amount: number, status: TransactionStatus, method: TransactionMethod) {
    this.amount = amount;
    this.status = status;
    this.method = method;
  }
}
