import { CreateSessionDTO, Session, UpdateSessionDTO } from '../dtos';

export interface SessionsRepositoryInterface {
  createSession(dto: CreateSessionDTO): Promise<Session>;
  deleteSession(sessionId: string, userId: string): Promise<Session | null>;
  updateSession(
    sessionId: string,
    dto: UpdateSessionDTO
  ): Promise<Session | null>;
  findSessionById(sessionId: string): Promise<Session | null>;
  findSessionsByUserId(userId: string): Promise<Session[]>;
}
