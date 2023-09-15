import { userMock } from '../../users/mocks/users-mock';
import { SessionStatus } from '@@types/session-status';
import { type SessionDTO } from '@@types/session.dto';
import { type Session } from '@modules/session/dtos';
import tokenUtils from '@utils/token-utils';
import { faker } from '@faker-js/faker';

export const sessionId = faker.string.uuid();
export const refreshToken = tokenUtils.refreshToken(sessionId);
export const accessToken = tokenUtils.accessToken({
  user_id: userMock.id,
  session_id: sessionId,
});

export const sessionDTOMock: SessionDTO = {
  refresh_token: refreshToken,
  access_token: accessToken,
  session_id: faker.string.uuid(),
};

export const sessionMock: Session = {
  id: sessionId,
  user_id: userMock.id,
  refresh_token: refreshToken,
  status: SessionStatus.ACTIVE,
  created_at: new Date().toISOString(),
};
