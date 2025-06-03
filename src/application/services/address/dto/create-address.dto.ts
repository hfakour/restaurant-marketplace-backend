// src/application/dto/create-address.dto.ts

import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { RestaurantId, UserId } from 'src/domain/types/entity-types';

@InputType()
export class CreateAddressDto {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: UserId; // 🎯 Use UserId type for full type safety

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  restaurantId?: RestaurantId; // 🎯 Use RestaurantId type

  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  street!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  country!: string;

  @Field(() => Float)
  @IsNumber()
  latitude!: number;

  @Field(() => Float)
  @IsNumber()
  longitude!: number;
}
