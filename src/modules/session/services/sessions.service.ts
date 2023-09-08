import { SessionsRepositoryInterface } from '../repositories/sessions.repository.interface';
import { SessionsServiceInterface } from './sessions.service.interface';
import { CreateSessionDTO, Session, UpdateSessionDTO } from '../dtos';
import { SessionDTO } from '@@types/session.dto';
import tokenUtils from '@utils/token-utils';
import { User } from '@modules/users/dto';
import { v4 as uuid } from 'uuid';

export class SessionsService implements SessionsServiceInterface {
  constructor(
    private readonly sessionRepository: SessionsRepositoryInterface
  ) {}

  async createSession(user: User): Promise<SessionDTO> {
    const session_id = uuid();
    const refresh_token = tokenUtils.refreshToken(session_id);
    const dto: CreateSessionDTO = {
      user_id: user.id,
      refresh_token,
      id: session_id,
    };

    await this.sessionRepository.createSession(dto);
    const access_token = tokenUtils.accessToken({
      user_id: user.id,
      session_id,
    });

    const tokens: SessionDTO = {
      access_token,
      refresh_token,
      session_id,
    };

    return tokens;
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

  async deleteSession(userId: string, sessionId: string): Promise<Session> {
    const session = await this.sessionRepository.deleteSession(
      sessionId,
      userId
    );

    if (!session) {
      throw new Error('Session not found');
    }

    return session;
  }
}
