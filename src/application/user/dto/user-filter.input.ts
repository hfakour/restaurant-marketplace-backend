// src/application/user/dto/user-filter.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsEmail } from 'class-validator';
import { UserRole } from 'src/domain/entities/user-role.enum';

@InputType()
export class UserFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
