// src/domain/entity/menu.entity.ts

import { Entity, PrimaryKey, Property, OneToMany, ManyToOne, Collection } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Restaurant } from './restaurant.entity';
import { Food } from './food.entity';

@ObjectType()
@Entity()
export class MenuEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique identifier for this menu

  @Field()
  @Property()
  title: string; // 📋 Menu name (e.g., Breakfast, Lunch)

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string; // 📝 Optional description

  @Field()
  @Property()
  isActive: boolean = true; // ✅ Whether this menu is currently shown

  @Field(() => Float, { nullable: true })
  @Property({ type: 'float', nullable: true })
  averageRating?: number; // 🌟 Aggregated rating from related food items

  @Field({ nullable: true })
  @Property({ nullable: true })
  isHighlighted?: boolean = false; // 🌟 Whether this is featured by the restaurant

  @Field({ nullable: true })
  @Property({ nullable: true })
  highlightReason?: string; // 🗯️ Optional label e.g. "Chef's Pick", "Most Ordered"

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant; // 🔗 Parent restaurant

  @Field(() => [Food])
  @OneToMany(() => Food, (food) => food.menu)
  items = new Collection<Food>(this); // 🍽️ Associated food items

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 Creation time

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // 📅 Last update
}
