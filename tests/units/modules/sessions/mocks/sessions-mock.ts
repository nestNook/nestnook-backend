import { userMock } from '../../users/mocks/users-mock';
import { SessionStatus } from '@@types/session-status';
import { SessionDTO } from '@@types/session.dto';
import { Session } from '@modules/session/dtos';
import tokenUtils from '@utils/token-utils';
import { faker } from '@faker-js/faker';
import config from '@config/index';

export const sessionId = faker.string.uuid();
export const refreshToken = tokenUtils.refreshToken(sessionId);
export const accessToken = tokenUtils.accessToken({
  user_id: userMock.id,
  session_id: sessionId,
});

export const sessionDTOMock = {
  refresh_token: refreshToken,
  access_token: accessToken,
  session_id: faker.string.uuid(),
} as SessionDTO;

export const sessionMock: Session = {
  id: sessionId,
  user_id: userMock.id,
  refresh_token: refreshToken,
  status: SessionStatus.ACTIVE,
  created_at: new Date().toISOString(),
};
