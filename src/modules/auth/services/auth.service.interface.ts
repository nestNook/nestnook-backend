import { type SessionDTO } from '@@types/session.dto';
import { type Session, type UpdateSessionDTO } from '@modules/session/dtos';
import { type SignInDTO } from '../dtos/sign-in.dto';
export interface AuthServiceInterface {
  login: (SignInDTO: SignInDTO) => Promise<SessionDTO>;
  findSessionById: (sessionsId: string) => Promise<Session>;
  updateSession: (
    sessionsId: string,
    dto: UpdateSessionDTO,
  ) => Promise<Session>;
}
