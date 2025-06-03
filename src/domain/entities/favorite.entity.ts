// src/domain/entity/favorite.entity.ts

import { Entity, PrimaryKey, Property, ManyToOne, Index } from "@mikro-orm/core";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { UserEntity } from "./user.entity";
import { FoodEntity } from "./food.entity";
import { RestaurantEntity } from "./restaurant.entity";

@ObjectType()
@Entity()
export class FavoriteEntity {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" }) // Use UUIDv7 for scalable, sortable PK
  id: string = uuidv7();

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index() // For fast lookup of a user's favorites
  user: UserEntity;

  @Field(() => FoodEntity, { nullable: true })
  @ManyToOne(() => FoodEntity, { nullable: true })
  @Index() // Query by food, enforce unique user-food favorites at DB level if possible
  food?: FoodEntity;

  @Field(() => RestaurantEntity, { nullable: true })
  @ManyToOne(() => RestaurantEntity, { nullable: true })
  @Index() // Query by restaurant, enforce unique user-restaurant favorites at DB level if possible
  restaurant?: RestaurantEntity;

  @Field({ nullable: true })
  @Property({ nullable: true })
  note?: string;

  @Field() // Expose for client apps/history
  @Property({ type: "date", onCreate: () => new Date() })
  createdAt: Date = new Date();

  // 🛡️ Optional: Business rule helpers
  isFoodFavorite(): boolean {
    return !!this.food && !this.restaurant;
  }
  isRestaurantFavorite(): boolean {
    return !!this.restaurant && !this.food;
  }
}
