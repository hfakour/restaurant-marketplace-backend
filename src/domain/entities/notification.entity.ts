// src/domain/entity/notification.entity.ts

import { Entity, Property, PrimaryKey, ManyToOne, Enum } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { NotificationType } from './notification-type.enum';
import { SupportMessageEntity } from './support-message.entity';

@ObjectType()
@Entity()
export class NotificationEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Globally unique and time-ordered ID

  @Field()
  @Property()
  title: string; // 📰 Short heading for the notification

  @Field()
  @Property()
  body: string; // 📩 Full message body

  @Field({ nullable: true })
  @Property({ nullable: true })
  imageUrl?: string; // 🖼️ Optional image (e.g., promo banner)

  @Field(() => NotificationType)
  @Enum(() => NotificationType) // ✅ Tells MikroORM it's an enum and to persist it as such
  type: NotificationType;

  @Field({ nullable: true })
  @Property({ nullable: true })
  deeplink?: string; // 🔗 In-app screen reference (e.g., "/orders/123")

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  targetUser?: User; // 👤 Notify a specific user

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { nullable: true })
  targetRestaurant?: Restaurant; // 🏪 Notify a specific restaurant

  @Field(() => SupportMessageEntity, { nullable: true })
  @ManyToOne(() => SupportMessageEntity, { nullable: true })
  supportMessage?: SupportMessageEntity;

  @Field()
  @Property()
  isRead: boolean = false; // ✅ Track whether it's seen

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  sentAt: Date = new Date(); // 📤 When it was sent

  @Field({ nullable: true })
  @Property({ type: 'date', nullable: true })
  readAt?: Date; // 🕒 When it was read (optional)
}
