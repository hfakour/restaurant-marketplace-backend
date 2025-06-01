// src/application/services/wishlist/dtos/create-wishlist.dto.ts

import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { FoodId, RestaurantId } from 'src/domain/types/entity-types';

@InputType()
export class CreateWishlistDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsArray()
  @IsUUID('4', { each: true })
  foodIds: FoodId[] = [];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsArray()
  @IsUUID('4', { each: true })
  restaurantIds: RestaurantId[] = [];
}
