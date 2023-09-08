import { SessionDTO } from '@@types/session.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
export interface AuthServiceInterface {
  login(SignInDTO: SignInDTO): Promise<SessionDTO>;
}
