import { Session } from '../dtos/session.dto';
import { CreateSessionDTO } from '../dtos/create-session.dto';
import { SessionsServiceInterface } from './sessions.service.interface';
import { SessionsRepositoryInterface } from '../repositories/sessions.repository.interface';

export class SessionsService implements SessionsServiceInterface {
  constructor(
    private readonly sessionRepository: SessionsRepositoryInterface
  ) {}

  async createSession(dto: CreateSessionDTO): Promise<Session> {
    const session = await this.sessionRepository.create(dto);
    return session;
  }

  async findUserSessions(userId: string): Promise<Session[]> {
    const sessions = await this.sessionRepository.findByUserId(userId);
    return sessions;
  }
}
