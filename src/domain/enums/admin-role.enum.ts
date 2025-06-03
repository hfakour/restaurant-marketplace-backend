// src/domain/enums/admin-role.enum.ts
import { registerEnumType } from '@nestjs/graphql';

/**
 * Different roles assigned to admin users.
 */
export enum AdminRole {
  ROOT = 'ROOT',
  RESTAURANT = 'RESTAURANT',
}

registerEnumType(AdminRole, {
  name: 'AdminRole',
  description: 'Different roles assigned to admin users',
});
