import { User } from '@modules/users/dto';
import { Session, UpdateSessionDTO } from '../dtos';
import { SessionDTO } from '@@types/session.dto';

export interface SessionsServiceInterface {
  createSession(user: User): Promise<SessionDTO>;
  findUserSessions(userId: string): Promise<Session[]>;
  findSessionById(sessionsId: string): Promise<Session>;
  updateSession(sessionsId: string, dto: UpdateSessionDTO): Promise<Session>;
  deleteSession(userId: string, sessionId: string): Promise<Session>;
}
