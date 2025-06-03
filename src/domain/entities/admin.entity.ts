// src/domain/entity/admin.entity.ts

import { Entity, Property, PrimaryKey, ManyToOne, Enum, Unique } from "@mikro-orm/core";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { RestaurantEntity } from "./restaurant.entity";
import { AdminRole } from "../enums/admin-role.enum";

@ObjectType() // 📦 Expose entity to GraphQL
@Entity() // 🏗️ MikroORM persistent table
export class AdminEntity {
  @Field(() => ID) // 🔗 Expose as GraphQL ID
  @PrimaryKey({ type: "uuid" }) // 🆔 Use UUID for primary key
  id: string = uuidv7(); // ➡️ Generate UUIDv7 as default

  @Field() // 📧 Email exposed in GraphQL
  @Property()
  @Unique() // ⚠️ Enforce unique emails at DB level
  email: string;

  @Property({ hidden: true }) // 🔒 Password never exposed in MikroORM serialization
  password: string;

  @Field(() => AdminRole) // 🏷️ Enum for role
  @Enum(() => AdminRole) // 🗂️ Persist as enum in DB
  role: AdminRole;

  @Field({ nullable: true }) // 🍽️ Expose restaurant if set
  @ManyToOne(() => RestaurantEntity, { nullable: true })
  restaurant?: RestaurantEntity; // 🗂️ Optional, for per-restaurant admin

  @Field({ nullable: true }) // 🧑‍💼 Full name
  @Property({ nullable: true })
  fullName?: string;

  @Field({ nullable: true }) // ☎️ Phone
  @Property({ nullable: true })
  phone?: string;

  @Field({ nullable: true }) // 🖼️ Image
  @Property({ nullable: true })
  imageUrl?: string;

  @Field() // 🕒 Creation time (GraphQL)
  @Property({ type: "date", onCreate: () => new Date() }) // 🗂️ Set automatically on create
  createdAt: Date = new Date();

  @Field() // 🔁 Last update time
  @Property({ type: "date", onUpdate: () => new Date() }) // 🗂️ Set automatically on update
  updatedAt: Date = new Date();

  // 🏗️ Constructor for service/DTO creation
  constructor(
    email: string,
    password: string,
    role: AdminRole,
    restaurant?: RestaurantEntity,
    fullName?: string,
    phone?: string,
    imageUrl?: string,
  ) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.restaurant = restaurant;
    this.fullName = fullName;
    this.phone = phone;
    this.imageUrl = imageUrl;
  }
}
