// ✅ Enum to define user roles clearly and consistently
import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  CUSTOMER = 'customer',
  DELIVERY = 'delivery',
  ADMIN = 'admin',
}

// ✅ Register enum for GraphQL
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Roles assigned to users in the platform',
});
