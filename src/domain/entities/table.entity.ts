import { Entity, Property, PrimaryKey, ManyToOne, Index } from "@mikro-orm/core";
import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { RestaurantEntity } from "./restaurant.entity";

@ObjectType()
@Entity()
export class TableEntity {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" }) // Explicit for DB
  id: string = uuidv7();

  @Field()
  @Property()
  name: string; // Table name or code (per restaurant)

  @Field(() => Int)
  @Property()
  seats: number; // How many people

  @Field(() => Float)
  @Property()
  pricePerHour: number; // Reservation cost

  @Field(() => RestaurantEntity)
  @ManyToOne(() => RestaurantEntity)
  @Index()
  restaurant: RestaurantEntity;

  @Field()
  @Property({ default: true })
  @Index()
  isAvailable: boolean = true;

  // (Optional, for admin/audit/history)
  // @Field()
  // @Property({ type: 'date', onCreate: () => new Date() })
  // createdAt: Date = new Date();

  // @Field()
  // @Property({ type: 'date', onUpdate: () => new Date() })
  // updatedAt: Date = new Date();
}
