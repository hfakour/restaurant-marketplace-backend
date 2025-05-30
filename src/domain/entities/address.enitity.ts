// src/domain/entity/address.entity.ts

import { Entity, Property, PrimaryKey, ManyToOne, OneToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';

@ObjectType() // 📦 Expose to GraphQL schema
@Entity() // 🏗️ MikroORM table
export class Address {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🆔 Unique identifier (UUID v7)

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  user?: User; // 👤 Optional — if this address belongs to a user

  @Field(() => Restaurant, { nullable: true })
  @OneToOne(() => Restaurant, (restaurant) => restaurant.address, {
    nullable: true,
    owner: true,
  })
  restaurant?: Restaurant; // 🍽️ Optional — if this address belongs to a restaurant

  @Field()
  @Property()
  title: string; // 🏷️ Label like "Home", "Work", "Branch 1"

  @Field()
  @Property()
  street: string; // 🛣️ Street name and number

  @Field()
  @Property()
  city: string; // 🏙️ City

  @Field()
  @Property()
  postalCode: string; // 🔢 Zip or postal code

  @Field()
  @Property()
  country: string; // 🌍 Country name

  @Field(() => Float)
  @Property()
  latitude: number; // 📍 Latitude coordinate

  @Field(() => Float)
  @Property()
  longitude: number; // 📍 Longitude coordinate

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 🕒 Created timestamp

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // 🔁 Last updated

  constructor(
    title: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    latitude: number,
    longitude: number,
    user?: User,
    restaurant?: Restaurant,
  ) {
    this.title = title;
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.user = user;
    this.restaurant = restaurant;
  }
}
