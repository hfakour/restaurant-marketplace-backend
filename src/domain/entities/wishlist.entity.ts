// src/domain/entity/wishlist.entity.ts

import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany, Collection } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { User } from './user.entity';
import { Food } from './food.entity';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Entity()
export class WishlistEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique wishlist identifier

  @Field(() => User)
  @ManyToOne(() => User)
  user: User; // 👤 The user who owns this wishlist

  @Field({ nullable: true })
  @Property({ nullable: true })
  title?: string; // 📝 Optional name for this wishlist (e.g. "Weekend Specials")

  @Field(() => [Food])
  @ManyToMany(() => Food)
  foods = new Collection<Food>(this); // 🍽️ Favorite food items

  @Field(() => [Restaurant])
  @ManyToMany(() => Restaurant)
  restaurants = new Collection<Restaurant>(this); // 🏪 Saved restaurants

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 When wishlist was created

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // 🕒 Last updated
}
