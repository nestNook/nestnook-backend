import { faker } from '@faker-js/faker';
import { SessionDTO } from '@@types/session.dto';

export const sessionMock = {
  refresh_token: faker.string.uuid(),
  access_token: faker.string.uuid(),
  session_id: faker.string.uuid(),
} as SessionDTO;
