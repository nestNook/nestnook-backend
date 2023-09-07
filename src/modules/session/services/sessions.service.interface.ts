import { CreateSessionDTO, Session, UpdateSessionDTO } from '../dtos';

export interface SessionsServiceInterface {
  createSession(dto: CreateSessionDTO): Promise<Session>;
  findUserSessions(userId: string): Promise<Session[]>;
  findSessionById(sessionsId: string): Promise<Session>;
  updateSession(sessionsId: string, dto: UpdateSessionDTO): Promise<Session>;
}
