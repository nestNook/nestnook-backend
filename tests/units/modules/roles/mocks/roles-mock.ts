import { UserRoles } from '@@types/user-roles';
import { faker } from '@faker-js/faker';
import { type Role } from '@modules/roles/dtos';

export const roleMock: Role = {
  created_at: new Date(),
  updated_at: new Date(),
  description: 'Role description',
  name: UserRoles.CUSTOMER,
  id: faker.string.uuid(),
};
