import tokenUtils from '@utils/token-utils';
import passwordUtils from '@utils/password-utils';

import { CreateUserResDTO } from '../dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersServiceInterface } from './users.service.interface';
import { UsersRepositoryInterface } from '../repositories/users.repository.interface';

export class UsersService implements UsersServiceInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  async createUser({
    email,
    name,
    phone_number,
    password,
    password_confirm,
  }: CreateUserDTO): Promise<CreateUserResDTO> {
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

    const tokens: CreateUserResDTO = {
      access_token: tokenUtils.accessToken(user.id),
      refresh_token: tokenUtils.refreshToken(user.id),
    };

    return tokens;
  }
}
