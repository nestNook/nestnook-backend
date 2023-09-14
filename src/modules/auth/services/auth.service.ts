import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { AuthServiceInterface } from './auth.service.interface';
import sessionModule from '@modules/session/session.module';
import passwordUtils from '@utils/password-utils';
import { SessionDTO } from '@@types/session.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { NotFoundException } from '@src/errors/not-found-exception';
import { User } from '@modules/users/dtos';
import { Session, UpdateSessionDTO } from '@modules/session/dtos';

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

  async getUserById(userId: string): Promise<User> {
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findSessionById(sessionsId: string): Promise<Session> {
    const session = await this.authRepository.findSessionById(sessionsId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async updateSession(
    sessionsId: string,
    dto: UpdateSessionDTO
  ): Promise<Session> {
    const updatedSession = await this.authRepository.updateSession(
      sessionsId,
      dto
    );

    if (!updatedSession) {
      throw new Error('Session not found');
    }

    return updatedSession;
  }
}
