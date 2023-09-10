import { SessionDTO } from '@@types/session.dto';
import { Session, UpdateSessionDTO } from '@modules/session/dtos';
import { SignInDTO } from '../dtos/sign-in.dto';
import { User } from '@modules/users/dto';
export interface AuthServiceInterface {
  login(SignInDTO: SignInDTO): Promise<SessionDTO>;
  getUserById(userId: string): Promise<User>;
  findSessionById(sessionsId: string): Promise<Session>;
  updateSession(sessionsId: string, dto: UpdateSessionDTO): Promise<Session>;
}
