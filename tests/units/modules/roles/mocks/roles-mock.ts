import { AccessLevel } from '@@types/access-level';
import { UserRoles } from '@@types/user-roles';
import { faker } from '@faker-js/faker';
import { type Role } from '@modules/roles/dtos';

export const roleMock: Role = {
  created_at: new Date(),
  updated_at: new Date(),
  description: 'Role description',
  name: UserRoles.CUSTOMER,
  access_level: AccessLevel.CUSTOMER,
  id: faker.string.uuid(),
};

export const adminRoleMock: Role = {
  created_at: new Date(),
  updated_at: new Date(),
  description: 'Admin',
  name: UserRoles.ADMIN,
  access_level: AccessLevel.ADMIN,
  id: faker.string.uuid(),
};
