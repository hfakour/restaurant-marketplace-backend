// src/domain/entity/menu.entity.ts

import {
  Entity, // 📦 Marks this class as a MikroORM persistent entity
  PrimaryKey, // 🗝️ Primary key decorator
  Property, // 🏷️ Marks a class property as a persistent DB column
  OneToMany, // 🔗 One-to-many relationship decorator
  ManyToOne, // 🔗 Many-to-one relationship decorator
  Collection, // 🧺 Collection wrapper for one-to-many/many-to-many
  Index, // 🏷️ Used to add DB indexes for fast queries
} from "@mikro-orm/core";
import {
  // 👉 NestJS GraphQL decorators
  ObjectType, //   Expose class/type to GraphQL schema
  Field, //   Expose property to GraphQL schema
  ID, //   Declare GraphQL ID type
  Float, //   Declare GraphQL Float type
} from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid"; // 🔑 Generates UUIDv7 for unique/sortable IDs
import { RestaurantEntity } from "./restaurant.entity"; // 🔗 Related parent restaurant
import { FoodEntity } from "./food.entity"; // 🔗 Related food items

@ObjectType() // 📦 Expose MenuEntity to the GraphQL schema
@Entity() // 🏷️ Persist this class as a MikroORM entity/table
export class MenuEntity {
  @Field(() => ID) // 📢 Expose 'id' as GraphQL ID type
  @PrimaryKey({ type: "uuid" }) // 🗝️ Primary key in DB, stored as UUID type
  id: string = uuidv7(); // ➡️ Default: generate a UUIDv7 for every new menu

  @Field() // 📢 Expose 'title' in GraphQL schema
  @Property() // 🏷️ Persist as DB column
  title: string; // 📝 Menu name (e.g., "Breakfast", "Dinner")

  @Field({ nullable: true }) // 📢 Expose 'description' in GraphQL, nullable
  @Property({ nullable: true }) // 🏷️ Optional DB column
  description?: string; // 📝 Optional description of the menu

  @Field({ defaultValue: true }) // 📢 Expose 'isActive' in GraphQL, with default 'true'
  @Property({ default: true }) // 🏷️ Default 'true' in DB for new rows
  @Index() // 🏷️ Index for fast queries on active menus
  isActive: boolean = true; // ✅ Is this menu visible/active?

  @Field(() => Float, { nullable: true }) // 📢 Expose 'averageRating' as nullable float
  @Property({ type: "float", nullable: true }) // 🏷️ Persist as nullable float
  averageRating?: number; // 🌟 Aggregated rating for menu's food items

  @Field() // 📢 Expose 'isHighlighted' (now non-nullable) in GraphQL
  @Property({ default: false }) // 🏷️ Default 'false' in DB
  @Index() // 🏷️ Index for quick "featured" filtering
  isHighlighted: boolean = false; // 🌟 Is this menu specially highlighted?

  @Field({ nullable: true }) // 📢 Expose 'highlightReason' in GraphQL, nullable
  @Property({ nullable: true }) // 🏷️ Optional DB column
  highlightReason?: string; // 🗯️ E.g., "Chef's Pick", "Most Ordered"

  @Field(() => RestaurantEntity) // 📢 Expose related restaurant in GraphQL
  @ManyToOne(() => RestaurantEntity) // 🔗 Many menus can belong to one restaurant
  @Index() // 🏷️ Index for querying all menus of a restaurant
  restaurant: RestaurantEntity; // 🔗 Parent restaurant

  @Field(() => [FoodEntity]) // 📢 Expose food items array in GraphQL
  @OneToMany(() => FoodEntity, (food) => food.menu)
  // 🔗 One menu can have many food items (inverse side is FoodEntity.menu)
  items = new Collection<FoodEntity>(this); // 🧺 Collection for related food items

  @Field() // 📢 Expose 'createdAt' in GraphQL
  @Property({ type: "date", onCreate: () => new Date() })
  // 🏷️ Timestamp, auto-set by MikroORM when created
  createdAt: Date = new Date(); // 📅 When was this menu created?

  @Field() // 📢 Expose 'updatedAt' in GraphQL
  @Property({ type: "date", onUpdate: () => new Date() })
  // 🏷️ Timestamp, auto-updated by MikroORM on changes
  updatedAt: Date = new Date(); // 📅 When was this menu last updated?
}
