import { type AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { UnauthorizedException } from '@src/errors/unauthorized-exception';
import { NotFoundException } from '@src/errors/not-found-exception';
import { type Session, type UpdateSessionDTO } from '@modules/session/dtos';
import { type AuthServiceInterface } from './auth.service.interface';
import sessionModule from '@modules/session/session.module';
import passwordUtils from '@utils/password-utils';
import { type SessionDTO } from '@@types/session.dto';
import { type SignInDTO } from '../dtos/sign-in.dto';
import { type User } from '@modules/users/dtos';

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  async login({ email, password }: SignInDTO): Promise<SessionDTO> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPassword = await passwordUtils.comparePass(
      password,
      user.password_hash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
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
    dto: UpdateSessionDTO,
  ): Promise<Session> {
    const updatedSession = await this.authRepository.updateSession(
      sessionsId,
      dto,
    );

    if (!updatedSession) {
      throw new NotFoundException('Session not found');
    }

    return updatedSession;
  }
}
