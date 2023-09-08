import { SessionsRepositoryInterface } from '../repositories/sessions.repository.interface';
import { SessionsServiceInterface } from './sessions.service.interface';
import { CreateSessionDTO, Session, UpdateSessionDTO } from '../dtos';
import { User } from '@modules/users/dto';
import tokenUtils from '@utils/token-utils';
import { SessionDTO } from '@@types/session.dto';

export class SessionsService implements SessionsServiceInterface {
  constructor(
    private readonly sessionRepository: SessionsRepositoryInterface
  ) {}

  async createSession(user: User): Promise<SessionDTO> {
    const access_token = tokenUtils.accessToken({
      user_id: user.id,
    });
    const refresh_token = tokenUtils.refreshToken(user.id);
    const dto: CreateSessionDTO = {
      user_id: user.id,
      refresh_token,
    };

    const { id: session_id } = await this.sessionRepository.createSession(dto);
    const session: SessionDTO = {
      access_token,
      refresh_token,
      session_id,
    };

    return session;
  }

  async findUserSessions(userId: string): Promise<Session[]> {
    const sessions = await this.sessionRepository.findSessionsByUserId(userId);
    return sessions;
  }

  async findSessionById(sessionsId: string): Promise<Session> {
    const session = await this.sessionRepository.findSessionById(sessionsId);

    if (!session) {
      throw new Error('Session not found');
    }

    return session;
  }

  async updateSession(
    sessionsId: string,
    dto: UpdateSessionDTO
  ): Promise<Session> {
    const updatedSession = await this.sessionRepository.updateSession(
      sessionsId,
      dto
    );

    if (!updatedSession) {
      throw new Error('Session not found');
    }

    return updatedSession;
  }
}
