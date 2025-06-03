import { Entity, Property, PrimaryKey, ManyToOne, Index } from "@mikro-orm/core";
import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { TableEntity } from "./table.entity";
import { UserEntity } from "./user.entity";
import { RestaurantEntity } from "./restaurant.entity";

@ObjectType()
@Entity()
export class ReservationEntity {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = uuidv7();

  @Field(() => TableEntity)
  @ManyToOne(() => TableEntity)
  table: TableEntity;

  @Field(() => RestaurantEntity)
  @ManyToOne(() => RestaurantEntity)
  @Index()
  restaurant: RestaurantEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index()
  user: UserEntity;

  @Field()
  @Property({ type: "date" })
  @Index() // Query reservations by time
  time: Date;

  @Field(() => Int, { nullable: true })
  @Property({ nullable: true })
  delayInMinutes?: number;

  // Snapshot fields for audit/history:
  @Field()
  @Property()
  tableNameAtBooking: string;

  @Field(() => Int)
  @Property()
  seatsAtBooking: number;

  @Field(() => Float)
  @Property()
  priceAtBooking: number;

  @Field(() => Int)
  @Property()
  durationInHours: number;

  @Field(() => Float)
  @Property()
  totalPrice: number;

  // (Optional for analytics/admin)
  @Field()
  @Property({ type: "date", onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
