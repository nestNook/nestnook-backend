import { Session } from '../dtos/session.dto';
import { CreateSessionDTO } from '../dtos/create-session.dto';

export interface SessionsServiceInterface {
  createSession(dto: CreateSessionDTO): Promise<Session>;
  findUserSessions(userId: string): Promise<Session[]>;
}
