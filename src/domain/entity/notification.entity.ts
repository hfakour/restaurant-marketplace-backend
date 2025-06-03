// src/domain/entity/notification.entity.ts

import {
  Entity, // 📦 MikroORM: declare a persistent entity/table
  Property, // 🏷️ MikroORM: map class field to DB column
  PrimaryKey, // 🗝️ MikroORM: mark field as primary key
  ManyToOne, // 🔗 MikroORM: many-to-one relationship
  Enum, // 🎛️ MikroORM: persist enum field as string/int
} from '@mikro-orm/core';
import {
  ObjectType, // 📦 NestJS GraphQL: expose class to GraphQL schema
  Field, // 📢 NestJS GraphQL: expose field to GraphQL
  ID, // 🆔 GraphQL: special type for unique IDs
} from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid'; // 🔑 For globally unique, time-sortable IDs

import { UserEntity } from './user.entity'; // 🔗 Related user (if targeted)
import { RestaurantEntity } from './restaurant.entity'; // 🔗 Related restaurant (if targeted)
import { NotificationType } from '../enums/notification-type.enum'; // 🎛️ Enum for notification types
import { SupportMessageEntity } from './support-message.entity'; // 🔗 Link to support messages (if applicable)

@ObjectType() // 📦 Expose this entity to the GraphQL schema
@Entity() // 🏷️ Mark this as a MikroORM-persisted table
export class NotificationEntity {
  @Field(() => ID) // 📢 Expose as GraphQL ID type
  @PrimaryKey({ type: 'uuid' }) // 🗝️ Use UUID v7 as the DB primary key
  id: string = uuidv7(); // ➡️ Default: generate unique, sortable ID

  @Field() // 📢 Expose 'title' in GraphQL
  @Property() // 🏷️ Persist as DB column
  title: string; // 📰 Notification headline (short, bold)

  @Field() // 📢 Expose 'body' in GraphQL
  @Property() // 🏷️ Persist as DB column
  body: string; // 📩 Full notification message

  @Field({ nullable: true }) // 📢 Optional image URL (promo banner, etc.)
  @Property({ nullable: true }) // 🏷️ DB column is nullable
  imageUrl?: string; // 🖼️ Optional associated image

  @Field(() => NotificationType) // 📢 Expose enum in GraphQL
  @Enum(() => NotificationType) // 🎛️ MikroORM: store as enum value
  type: NotificationType; // 📬 What type of notification (enum)

  @Field({ nullable: true }) // 📢 Optional deeplink in GraphQL
  @Property({ nullable: true }) // 🏷️ Nullable in DB
  deeplink?: string; // 🔗 App-specific navigation target (e.g., "/orders/123")

  @Field(() => UserEntity, { nullable: true }) // 📢 Optionally expose target user in GraphQL
  @ManyToOne(() => UserEntity, { nullable: true })
  // 🔗 Notification for a specific user, nullable for general/system-wide
  targetUser?: UserEntity; // 👤 User to notify

  @Field(() => RestaurantEntity, { nullable: true }) // 📢 Optionally expose target restaurant
  @ManyToOne(() => RestaurantEntity, { nullable: true })
  // 🔗 Notification for a specific restaurant, nullable for global/user-only
  targetRestaurant?: RestaurantEntity; // 🏪 Restaurant to notify

  @Field(() => SupportMessageEntity, { nullable: true }) // 📢 Optionally expose related support message
  @ManyToOne(() => SupportMessageEntity, { nullable: true })
  // 🔗 Link to a support message (e.g., response, follow-up)
  supportMessage?: SupportMessageEntity;

  @Field() // 📢 Expose read status in GraphQL
  @Property({ default: false }) // 🏷️ DB column, default 'false'
  isRead: boolean = false; // ✅ Has the notification been seen by the recipient?

  @Field() // 📢 Expose sent timestamp in GraphQL
  @Property({ type: 'date', onCreate: () => new Date() })
  // 🏷️ Automatically set when entity is created
  sentAt: Date = new Date(); // 📤 When it was sent

  @Field({ nullable: true }) // 📢 Optionally expose read time in GraphQL
  @Property({ type: 'date', nullable: true })
  // 🏷️ Nullable in DB; set when read
  readAt?: Date; // 🕒 When it was read (if at all)
}
