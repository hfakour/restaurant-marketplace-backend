import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  OneToOne,
  Collection,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { ReviewEntity } from './review.entity';
import { AddressEntity } from './address.entity';
import { MenuEntity } from './menu.entity';
import { ReservationEntity } from './reservation.entity';
import { RestaurantCategoryEntity } from './restaurant-category.entity';

@ObjectType()
@Entity()
export class RestaurantEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();

  @Field()
  @Property()
  @Index() // Query restaurants by name
  name: string;

  @Field()
  @Property()
  description: string;

  @Field(() => RestaurantCategoryEntity)
  @ManyToOne(() => RestaurantCategoryEntity)
  @Index()
  restaurantCategory: RestaurantCategoryEntity;

  @Field()
  @Property()
  chef: string;

  @Field()
  @Property()
  chefImage: string;

  @Field(() => AddressEntity, { nullable: true })
  @OneToOne(() => AddressEntity, (address) => address.restaurant, {
    nullable: true,
  })
  address?: AddressEntity;

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
  @Index()
  isOpen: boolean;

  @Field(() => [String])
  @Property({ type: 'text[]' })
  tags: string[];

  @Field(() => [MenuEntity])
  @Property({ persist: false })
  menuHighlights?: MenuEntity[];

  @Field({ defaultValue: true })
  @Property({ default: true })
  @Index()
  isActive: boolean = true;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
