import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { v7 } from 'uuid';
import { UserEntity } from './user.entity';
import { RestaurantEntity } from './restaurant.entity';
import { FoodEntity } from './food.entity';

@ObjectType()
@Entity()
export class ReviewEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v7();

  @Field()
  @Property()
  comment: string;

  @Field(() => Float)
  @Property()
  starRating: number;

  @Field(() => Int)
  @Property({ default: 0 })
  likes: number = 0;

  @Field(() => Int)
  @Property({ default: 0 })
  dislikes: number = 0;

  @Field(() => RestaurantEntity, { nullable: true })
  @ManyToOne(() => RestaurantEntity, { nullable: true })
  @Index()
  restaurant?: RestaurantEntity;

  @Field(() => FoodEntity, { nullable: true })
  @ManyToOne(() => FoodEntity, { nullable: true })
  @Index()
  food?: FoodEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index()
  user: UserEntity;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  @Index()
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    comment: string,
    starRating: number,
    user: UserEntity,
    restaurant?: RestaurantEntity,
    food?: FoodEntity,
  ) {
    this.comment = comment;
    this.starRating = starRating;
    this.user = user;
    this.restaurant = restaurant;
    this.food = food;
  }
}
