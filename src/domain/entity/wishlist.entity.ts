import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
  Index,
} from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { UserEntity } from './user.entity';
import { FoodEntity } from './food.entity';
import { RestaurantEntity } from './restaurant.entity';

@ObjectType()
@Entity()
export class WishlistEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' }) // Strong DB typing
  id: string = uuidv7();

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index() // For quick user-wishlist lookup
  user: UserEntity;

  @Field({ nullable: true })
  @Property({ nullable: true })
  title?: string;

  @Field(() => [FoodEntity])
  @ManyToMany(() => FoodEntity)
  foods = new Collection<FoodEntity>(this);

  @Field(() => [RestaurantEntity])
  @ManyToMany(() => RestaurantEntity)
  restaurants = new Collection<RestaurantEntity>(this);

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  @Index()
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
