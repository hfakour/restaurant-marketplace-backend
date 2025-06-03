// src/domain/enums/user-role.enum.ts
import { registerEnumType } from '@nestjs/graphql';

/**
 * Platform user roles (for access control and business logic)
 */
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  DELIVERY = 'DELIVERY',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Roles assigned to users in the platform',
});
