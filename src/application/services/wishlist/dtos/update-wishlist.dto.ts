// src/application/services/wishlist/dtos/update-wishlist.dto.ts

import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { WishlistId, FoodId, RestaurantId } from 'src/domain/types/entity-types';

@InputType()
export class UpdateWishlistDto {
  @Field(() => ID)
  @IsUUID('4')
  id: WishlistId;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  foodIds?: FoodId[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  restaurantIds?: RestaurantId[];
}
