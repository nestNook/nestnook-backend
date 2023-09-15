import { type Session, type UpdateSessionDTO } from '@modules/session/dtos';
import { type User } from '@modules/users/dtos';

export interface AuthRepositoryInterface {
  findByEmail: (email: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  findSessionById: (sessionId: string) => Promise<Session | null>;
  updateSession: (
    sessionId: string,
    dto: UpdateSessionDTO,
  ) => Promise<Session | null>;
}
