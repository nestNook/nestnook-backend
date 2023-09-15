import { faker } from '@faker-js/faker';
import { User } from '@modules/users/dtos';

const userId = faker.string.uuid();
const roleId = faker.string.uuid();
const password = faker.internet.password({ length: 8 });

export const adminMock = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password,
  password_confirm: password,
  phone_number: faker.phone.number('189########'),
  created_at: new Date(),
  updated_at: new Date(),
  otp_enabled: false,
  email_verified: false,
  google_id: null,
  password_hash: faker.string.hexadecimal({ length: 32 }),
  profile_pic_id: null,
  otp_secret: null,
  id: userId,
  role: {
    id: roleId,
    name: 'admin',
    description: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  },
} as User;
