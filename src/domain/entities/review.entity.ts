import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { v7 } from 'uuid';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { Food } from './food.entity';

@ObjectType()
@Entity()
export class ReviewEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = v7(); // ✅ Unique identifier for this review

  @Field()
  @Property()
  comment: string; // 💬 The review content

  @Field(() => Float)
  @Property()
  starRating: number; // ⭐ Rating given to restaurant/food (1–5)

  @Field(() => Int)
  @Property({ default: 0 })
  likes: number = 0; // 👍 Helpful votes

  @Field(() => Int)
  @Property({ default: 0 })
  dislikes: number = 0; // 👎 Unhelpful votes

  // 🔗 Optional: review for a restaurant
  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;

  // 🔗 Optional: review for a food item
  @Field(() => Food, { nullable: true })
  @ManyToOne(() => Food, { nullable: true })
  food?: Food;

  // 👤 Author of the review
  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 Review creation timestamp

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // 🔁 Last modified timestamp

  constructor(
    comment: string,
    starRating: number,
    user: User,
    restaurant?: Restaurant,
    food?: Food,
  ) {
    this.comment = comment;
    this.starRating = starRating;
    this.user = user;
    this.restaurant = restaurant;
    this.food = food;
  }
}
