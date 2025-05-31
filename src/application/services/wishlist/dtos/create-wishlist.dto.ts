// src/application/services/wishlist/dto/create-wishlist.dto.ts
import { Field, InputType, ID } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateWishlistDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string; // 📝 Optional title for the wishlist

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsArray()
  @IsUUID('4', { each: true })
  foodIds: string[] = []; // 🍽️ Food UUIDs to associate

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsArray()
  @IsUUID('4', { each: true })
  restaurantIds: string[] = []; // 🏪 Restaurant UUIDs to associate
}
