import { SessionDTO } from '@@types/session.dto';
import { SignInDTO } from '../dtos/sign-in.dto';

export interface AuthControllerInterface {
  signIn(dto: SignInDTO): Promise<SessionDTO>;
}
