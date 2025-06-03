// src/domain/entity/address.entity.ts

import { Entity, Property, PrimaryKey, ManyToOne, OneToOne } from "@mikro-orm/core";
import { ObjectType, Field, ID, Float } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { UserEntity } from "./user.entity";
import { RestaurantEntity } from "./restaurant.entity";

@ObjectType() // 📦 Expose this entity to GraphQL API consumers
@Entity() // 🏗️ Mark this class as a MikroORM table
export class AddressEntity {
  @Field(() => ID) // 🔗 Expose as GraphQL ID
  @PrimaryKey({ type: "uuid" }) // 🆔 Use UUID as primary key (MikroORM)
  id: string = uuidv7(); // ➡️ Generate a unique ID using UUIDv7

  @Field(() => UserEntity, { nullable: true }) // 👤 Optionally expose the owning user in GraphQL
  @ManyToOne(() => UserEntity, { nullable: true }) // 🔗 Many addresses can belong to a single user
  user?: UserEntity; // 🗂️ Optional owner user

  @Field(() => RestaurantEntity, { nullable: true }) // 🍽️ Optionally expose the owning restaurant in GraphQL
  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.address, {
    nullable: true,
    owner: true,
  }) // 🔗 One address per restaurant, owner-side relationship
  restaurant?: RestaurantEntity; // 🗂️ Optional restaurant

  @Field() // 🏷️ Expose title in GraphQL
  @Property() // 🏷️ Persist as a column
  title: string; // ➡️ E.g., "Home", "Work", "Branch 1"

  @Field()
  @Property()
  street: string; // ➡️ Street and number

  @Field()
  @Property()
  city: string; // ➡️ City name

  @Field()
  @Property()
  postalCode: string; // ➡️ Postal or zip code

  @Field()
  @Property()
  country: string; // ➡️ Country name

  @Field(() => Float)
  @Property()
  latitude: number; // ➡️ Latitude coordinate

  @Field(() => Float)
  @Property()
  longitude: number; // ➡️ Longitude coordinate

  @Field()
  @Property({ type: "date", onCreate: () => new Date() }) // 🕒 Created at timestamp
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() }) // 🔁 Updated at timestamp
  updatedAt: Date = new Date();

  constructor(
    title: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    latitude: number,
    longitude: number,
    user?: UserEntity,
    restaurant?: RestaurantEntity,
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
