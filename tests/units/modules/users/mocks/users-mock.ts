import {
  CreateUserDTO,
  GetUserDTO,
  InternCreateUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
  User,
} from '@modules/users/dto';
import { faker } from '@faker-js/faker';

const password = faker.internet.password({ length: 8 });

export const createUserMock = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password,
  password_confirm: password,
  phone_number: faker.phone.number('189########'),
} as CreateUserDTO;

const userId = faker.string.uuid();

export const userMock = {
  ...createUserMock,
  created_at: new Date(),
  updated_at: new Date(),
  otp_enabled: false,
  email_verified: false,
  google_id: null,
  password_hash: faker.string.hexadecimal({ length: 32 }),
  profile_pic_id: null,
  otp_secret: null,
  id: userId,
} as User;

export const internCreateUserMock = {
  email: userMock.email,
  name: userMock.name,
  phone_number: userMock.phone_number,
  password_hash: userMock.password_hash,
} as InternCreateUserDTO;

export const publicUserMock = {
  email: userMock.email,
  id: userId,
  name: userMock.name,
} as GetUserDTO;

export const updateUserMock = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  phone_number: faker.phone.number('189########'),
} as UpdateUserDTO;

export const updateUserPasswordMock = {
  currentPassword: createUserMock.password,
  password: password,
  passwordConfirm: password,
} as UpdatePasswordDTO;
