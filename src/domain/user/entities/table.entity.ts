import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Entity()
export class Table {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // ✅ Unique ID using UUIDv7

  @Field()
  @Property()
  name: string; // 🪑 Table name or code (e.g., A1, VIP-2)

  @Field(() => Int)
  @Property()
  seats: number; // 👥 How many people this table can seat

  @Field(() => Float)
  @Property()
  pricePerHour: number; // 💰 Cost of reserving per hour

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant; // 🍽️ Which restaurant owns this table

  @Field()
  @Property({ default: true })
  isAvailable: boolean = true; // ✅ Used to mark as inactive or removed
}
