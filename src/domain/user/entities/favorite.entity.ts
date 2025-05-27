// src/domain/entity/favorite.entity.ts

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { User } from './user.entity';
import { Food } from './food.entity';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Entity()
export class FavoriteEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique ID for favorite record

  @Field(() => User)
  @ManyToOne(() => User)
  user: User; // 👤 Who favorited the item

  @Field(() => Food, { nullable: true })
  @ManyToOne(() => Food, { nullable: true })
  food?: Food; // 🍕 Optional: Favorited food item

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { nullable: true })
  restaurant?: Restaurant; // 🏪 Optional: Favorited restaurant

  @Field({ nullable: true })
  @Property({ nullable: true })
  note?: string; // 📝 Optional note (e.g., "Best pizza ever!")

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 When this was favorited
}
