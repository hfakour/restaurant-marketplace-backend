import { registerEnumType } from '@nestjs/graphql';

export enum AdminRole {
  ROOT = 'ROOT',
  RESTAURANT = 'RESTAURANT',
}

registerEnumType(AdminRole, {
  name: 'AdminRole',
  description: 'Different roles assigned to admin users',
});
