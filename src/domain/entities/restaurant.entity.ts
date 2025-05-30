// src/domain/entity/restaurant.entity.ts

import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  OneToOne,
  Collection,
  ManyToOne,
} from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { ReviewEntity } from './review.entity';
import { Address } from './address.enitity';
import { MenuEntity } from './menu.entity';
import { ReservationEntity } from './reservation.entity';
import { RestaurantCategoryEntity } from './restaurant-category.entity';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🔑 Unique identifier

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  description: string;

  @Field(() => RestaurantCategoryEntity)
  @ManyToOne(() => RestaurantCategoryEntity)
  restaurantCategory: RestaurantCategoryEntity;

  @Field()
  @Property()
  chef: string;

  @Field()
  @Property()
  chefImage: string;

  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, (address) => address.restaurant, {
    nullable: true,
  })
  address?: Address; // ✅ One-to-one with optional Address

  @Field()
  @Property()
  deliveryTime: string;

  @Field()
  @Property()
  logo: string;

  @Field()
  @Property()
  image: string;

  @Field(() => [String])
  @Property({ type: 'text[]' })
  gallery: string[];

  @Field(() => [MenuEntity])
  @OneToMany(() => MenuEntity, (menu) => menu.restaurant)
  menus = new Collection<MenuEntity>(this);

  @Field(() => [ReviewEntity])
  @Property({ persist: false })
  reviews?: ReviewEntity[];

  @Field(() => [ReservationEntity])
  @OneToMany(() => ReservationEntity, (reservation) => reservation.restaurant)
  reservations = new Collection<ReservationEntity>(this);

  @Field()
  @Property()
  openTime: string;

  @Field()
  @Property()
  closeTime: string;

  @Field()
  @Property()
  isOpen: boolean;

  @Field(() => [String])
  @Property({ type: 'text[]' })
  tags: string[];

  @Field(() => [MenuEntity])
  @Property({ persist: false })
  menuHighlights?: MenuEntity[];

  @Field()
  @Property({ default: true })
  isActive: boolean = true; // ✅ Restaurant can be deactivated by admin
}
