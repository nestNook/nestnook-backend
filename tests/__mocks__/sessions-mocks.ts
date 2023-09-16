import { AuthRepository } from '@modules/auth/repositories/auth.repository';
import { userMock } from '@test/units/modules/users/mocks/users-mock';
import { AuthService } from '@modules/auth/services/auth.service';
import { type SessionDTO } from '@@types/session.dto';
import { type User } from '@modules/users/dtos';
import { sessionMock } from './sessions-mock';
import * as sinon from 'sinon';

interface MockSessionParams {
  user?: User;
  session?: SessionDTO;
}

export class MockSession {
  private static findUserByIdRepositoryStub: sinon.SinonStub | null = null;
  private static createSessionServiceStub: sinon.SinonStub | null = null;

  public static mockSession(params?: MockSessionParams): void {
    MockSession.createSessionServiceStub = sinon.stub(
      AuthService.prototype,
      'findSessionById',
    );

    MockSession.findUserByIdRepositoryStub = sinon.stub(
      AuthRepository.prototype,
      'findUserById',
    );

    MockSession.createSessionServiceStub.callsFake(
      async () => await Promise.resolve(params?.session ?? sessionMock),
    );

    MockSession.findUserByIdRepositoryStub.callsFake(
      async () => await Promise.resolve(params?.user ?? userMock),
    );
  }

  public static restoreSessionMock(): void {
    MockSession.createSessionServiceStub?.restore();
    MockSession.findUserByIdRepositoryStub?.restore();
  }
}
