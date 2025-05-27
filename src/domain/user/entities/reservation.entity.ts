import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Table } from './table.entity';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Entity()
export class ReservationEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 📌 Unique reservation ID

  @Field(() => Table)
  @ManyToOne(() => Table)
  table: Table; // 🔗 Live link to the current table entity

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant; // 🍽️ Restaurant where table is reserved

  @Field(() => User)
  @ManyToOne(() => User)
  user: User; // 👤 Who made the reservation

  @Field()
  @Property()
  time: Date; // 🕒 Time of reservation

  @Field(() => Int, { nullable: true })
  @Property({ nullable: true })
  delayInMinutes?: number; // ⏱️ Delay if they arrived late

  // 📝 Snapshot Fields — for historical accuracy:
  @Field()
  @Property()
  tableNameAtBooking: string; // e.g., A1 or VIP-2

  @Field(() => Int)
  @Property()
  seatsAtBooking: number; // 👥 Capacity at time of booking

  @Field(() => Float)
  @Property()
  priceAtBooking: number; // 💸 Price user paid when they booked

  @Field(() => Int)
  @Property()
  durationInHours: number; // ⌛ For how many hours booked

  @Field(() => Float)
  @Property()
  totalPrice: number; // 💵 Computed = pricePerHour * duration
}
