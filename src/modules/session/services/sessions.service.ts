import { SessionsRepositoryInterface } from '../repositories/sessions.repository.interface';
import { SessionsServiceInterface } from './sessions.service.interface';
import { CreateSessionDTO, Session } from '../dtos';

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
}
