import tokenUtils from '@utils/token-utils';
import passwordUtils from '@utils/password-utils';

import { SessionDTO } from '@@types/session.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import sessionModule from '@modules/session/session.module';
import { UsersServiceInterface } from './users.service.interface';
import { UsersRepositoryInterface } from '../repositories/users.repository.interface';
import { GetUserDTO } from '../dto';

export class UsersService implements UsersServiceInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  async createUser({
    email,
    name,
    phone_number,
    password,
    password_confirm,
  }: CreateUserDTO): Promise<SessionDTO> {
    const isEmailAlreadyExistent = await this.usersRepository.findByEmail(
      email
    );

    if (isEmailAlreadyExistent) {
      throw new Error('Email already exists');
    }

    if (password !== password_confirm) {
      throw new Error('Passwords does not match');
    }

    const password_hash = await passwordUtils.hashPass(password);

    const user = await this.usersRepository.create({
      email,
      name,
      phone_number,
      password_hash,
    });

    const access_token = tokenUtils.accessToken({
      user_id: user.id,
    });
    const refresh_token = tokenUtils.refreshToken(user.id);

    const { id: session_id } = await sessionModule.service.createSession({
      user_id: user.id,
      refresh_token,
    });

    const tokens: SessionDTO = {
      access_token,
      refresh_token,
      session_id,
    };

    return tokens;
  }

  async getUserById(userId: string): Promise<GetUserDTO | null> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
