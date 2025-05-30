// src/application/user/dto/update-user.dto.ts

import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string; // Optional update

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string; // Optional update

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Optional update

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string; // Optional update — if provided, will be hashed
}
