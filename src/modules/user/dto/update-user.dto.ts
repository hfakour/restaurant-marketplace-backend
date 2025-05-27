import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../../domain/user/entities/user-role.enum'; // ✅ import enum
import { registerEnumType } from '@nestjs/graphql';

// ✅ Register enum for optional usage in update DTO
registerEnumType(UserRole, {
  name: 'UserRoleUpdateInput',
  description: 'Valid roles for updating a user',
});

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
