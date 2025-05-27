// src/domain/entity/support-message.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { SupportChatType } from './support-chat-type.enum';

@ObjectType()
@Entity()
export class SupportMessageEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7();

  @Field()
  @Property()
  content: string; // 💬 Message content

  @Field(() => SupportChatType)
  @Property({ type: 'string' }) // ⚠️ Enums must be stored as 'string'
  type: SupportChatType; // 🛠️ Chat type: USER_TO_RESTAURANT | USER_TO_SUPPORT

  @Field(() => User)
  @ManyToOne(() => User)
  senderUser: User; // 🧍 Who sent it (can be customer or admin)

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  receiverUser?: User; // 👥 Support/admin or other user

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
  @Property()
  isFromAdmin: boolean = false;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { nullable: true })
  restaurant?: Restaurant; // 🍽️ If chat is with a restaurant

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
