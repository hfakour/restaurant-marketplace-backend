// src/application/services/wishlist/dto/update-wishlist.dto.ts
import { Field, InputType, ID } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateWishlistDto {
  @Field(() => ID)
  @IsUUID('4')
  id: string; // 🔑 Wishlist ID to update

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  foodIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  restaurantIds?: string[];
}
