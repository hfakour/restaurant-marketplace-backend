// src/application/services/wishlist/dto/wishlist-output.dto.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Restaurant } from 'src/domain/entities/restaurant.entity';
import { Food } from 'src/domain/entities/food.entity';

@ObjectType()
export class WishlistOutputDto {
  @Field(() => ID)
  id: string;

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
