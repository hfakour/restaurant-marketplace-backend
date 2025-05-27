import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../../../domain/user/entities/user-role.enum'; // ✅ import enum
import { registerEnumType } from '@nestjs/graphql';

// ✅ Register enum for GraphQL input usage
registerEnumType(UserRole, {
  name: 'UserRoleInput',
  description: 'Valid roles for creating a user',
});

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}
