// src/application/admin/dto/create-admin.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, MinLength, IsEnum } from 'class-validator';
import { AdminRole } from 'src/domain/entities/admin-role.enum';

@InputType()
export class CreateAdminDto {
  @Field(() => String)
  @IsEnum(AdminRole)
  role: AdminRole;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
