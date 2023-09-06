import { CreateSessionDTO, Session } from '../dtos';

export interface SessionsServiceInterface {
  createSession(dto: CreateSessionDTO): Promise<Session>;
  findUserSessions(userId: string): Promise<Session[]>;
}
