import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { UserEntity } from './user.entity';
import { RestaurantEntity } from './restaurant.entity';
import { SupportChatType } from '../enums/support-chat-type.enum';

@ObjectType()
@Entity()
export class SupportMessageEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();

  @Field()
  @Property()
  content: string;

  @Field(() => SupportChatType)
  @Property({ type: 'string' })
  type: SupportChatType;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index()
  senderUser: UserEntity;

  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, { nullable: true })
  @Index()
  receiverUser?: UserEntity;

  @Field({ nullable: true })
  @Property({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  replyToMessageId?: string;

  @Field()
  @Property({ default: false })
  isRead: boolean = false;

  @Field()
  @Property({ default: false })
  isFromAdmin: boolean = false;

  @Field(() => RestaurantEntity, { nullable: true })
  @ManyToOne(() => RestaurantEntity, { nullable: true })
  @Index()
  restaurant?: RestaurantEntity;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  @Index()
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
