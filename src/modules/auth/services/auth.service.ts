import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { AuthServiceInterface } from './auth.service.interface';
import sessionModule from '@modules/session/session.module';
import passwordUtils from '@utils/password-utils';
import { SessionDTO } from '@@types/session.dto';
import { SignInDTO } from '../dtos/sign-in.dto';

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  async login({ email, password }: SignInDTO): Promise<SessionDTO> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await passwordUtils.comparePass(
      password,
      user.password_hash
    );

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const session: SessionDTO = await sessionModule.service.createSession(user);

    return session;
  }
}
