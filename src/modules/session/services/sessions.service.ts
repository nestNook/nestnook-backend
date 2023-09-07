import { SessionsRepositoryInterface } from '../repositories/sessions.repository.interface';
import { SessionsServiceInterface } from './sessions.service.interface';
import { CreateSessionDTO, Session, UpdateSessionDTO } from '../dtos';

export class SessionsService implements SessionsServiceInterface {
  constructor(
    private readonly sessionRepository: SessionsRepositoryInterface
  ) {}

  async createSession(dto: CreateSessionDTO): Promise<Session> {
    const session = await this.sessionRepository.createSession(dto);
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
