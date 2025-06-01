// src/application/services/wishlist/dtos/wishlist-output.dto.ts

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Food } from 'src/domain/entities/food.entity';
import { Restaurant } from 'src/domain/entities/restaurant.entity';
import { WishlistId } from 'src/domain/types/entity-types';

@ObjectType()
export class WishlistOutputDto {
  @Field(() => ID)
  id: WishlistId;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [Food])
  foods: Food[];

  @Field(() => [Restaurant])
  restaurants: Restaurant[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
