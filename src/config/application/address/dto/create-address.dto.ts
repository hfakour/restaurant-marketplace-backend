// src/application/dto/create-address.dto.ts

import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsString, IsNumber, IsNotEmpty } from 'class-validator';

@InputType() // 👈 Enables this DTO to be used in GraphQL mutations
export class CreateAddressDto {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string; // Optional user ID if address belongs to a user

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  restaurantId?: string; // Optional restaurant ID if address belongs to a restaurant

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string; // e.g., "Home", "Work", "Branch 1"

  @Field()
  @IsString()
  @IsNotEmpty()
  street: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Field(() => Float)
  @IsNumber()
  latitude: number; // e.g., 40.7128

  @Field(() => Float)
  @IsNumber()
  longitude: number; // e.g., -74.0060
}
