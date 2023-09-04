import { CreateSessionDTO } from '../dtos/create-session.dto';
import { Session } from '../dtos/session.dto';
import { UpdateSessionDTO } from '../dtos/update-session.dto';

export interface SessionsRepositoryInterface {
  create(dto: CreateSessionDTO): Promise<Session>;
  delete(sessionId: string): Promise<Session | null>;
  updateSession(
    sessionId: string,
    dto: UpdateSessionDTO
  ): Promise<Session | null>;
  findById(sessionId: string): Promise<Session | null>;
  findByUserId(userId: string): Promise<Session[]>;
}
