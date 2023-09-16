import { AccessLevel } from '@@types/access-level';
import { User } from '@modules/users/dtos';
import { faker } from '@faker-js/faker';

const userId = faker.string.uuid();
const roleId = faker.string.uuid();

export const adminMock: User = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
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
    access_level: AccessLevel.ADMIN,
  },
};
