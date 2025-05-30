// src/application/dto/update-address.dto.ts

import { InputType, Field, ID, Float, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

@InputType() // 👈 Required for GraphQL mutation input
export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string; // Optional — update associated user

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  restaurantId?: string; // Optional — update associated restaurant

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string; // Optional — update address label (e.g. "Home")

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  street?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
