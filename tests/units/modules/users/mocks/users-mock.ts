import {
  type GivePrivilegesDTO,
  type CreateUserDTO,
  type GetUserDTO,
  type InternCreateUserDTO,
  type UpdatePasswordDTO,
  type UpdateUserDTO,
  type User,
} from '@modules/users/dtos';
import { faker } from '@faker-js/faker';
import { roleMock } from '../../roles/mocks/roles-mock';
import { UserRoles } from '@@types/user-roles';

const password = faker.internet.password({ length: 8 });

export const createUserMock: CreateUserDTO = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password,
  password_confirm: password,
  phone_number: faker.phone.number('189########'),
};

const userId = faker.string.uuid();
const roleId = faker.string.uuid();

export const userMock: User = {
  email: createUserMock.email,
  name: createUserMock.name,
  phone_number: createUserMock.phone_number,
  created_at: new Date(),
  updated_at: new Date(),
  otp_enabled: false,
  email_verified: false,
  google_id: null,
  password_hash: faker.string.hexadecimal({ length: 32 }),
  profile_pic_id: null,
  otp_secret: null,
  id: userId,
  role: roleMock,
};

export const internCreateUserMock: InternCreateUserDTO = {
  email: userMock.email,
  name: userMock.name,
  phone_number: userMock.phone_number,
  password_hash: userMock.password_hash,
  role_id: roleId,
};

export const publicUserMock: GetUserDTO = {
  email: userMock.email,
  id: userId,
  name: userMock.name,
  role: roleMock,
};

export const updateUserMock: UpdateUserDTO = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  phone_number: faker.phone.number('189########'),
};

export const updateUserPasswordMock: UpdatePasswordDTO = {
  currentPassword: createUserMock.password,
  password,
  passwordConfirm: password,
};

export const givePrivilegesDTOMock: GivePrivilegesDTO = {
  privilege: UserRoles.ADMIN,
  userId: faker.string.uuid(),
};
