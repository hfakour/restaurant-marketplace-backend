// src/application/user/dto/create-user.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/domain/user/entities/user-role.enum';

@InputType() // 👈 Required for GraphQL input types
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string; // Required: User's email

  @Field()
  @IsString()
  @MinLength(6)
  password: string; // Required: Plain password (to be hashed later)

  @Field(() => String)
  @IsEnum(UserRole)
  role: UserRole; // Required: Role from enum (ADMIN, CUSTOMER, etc.)

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string; // Optional full name

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string; // Optional phone number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Optional profile image URL
}
