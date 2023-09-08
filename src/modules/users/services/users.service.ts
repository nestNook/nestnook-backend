import tokenUtils from '@utils/token-utils';
import passwordUtils from '@utils/password-utils';
import sessionModule from '@modules/session/session.module';

import { SessionDTO } from '@@types/session.dto';
import { UserBuilder } from '../providers/user.builder';
import { UsersServiceInterface } from './users.service.interface';
import {
  CreateUserDTO,
  GetUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from '../dto';
import { UsersRepositoryInterface } from '../repositories/users.repository.interface';

export class UsersService implements UsersServiceInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  async createUser({
    email,
    name,
    phone_number,
    password,
    password_confirm,
  }: CreateUserDTO): Promise<SessionDTO> {
    const isEmailAlreadyExistent = await this.usersRepository.find({ email });

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

    const session = await sessionModule.service.createSession(user);

    return session;
  }

  async getUserById(userId: string): Promise<GetUserDTO | null> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async deleteUserById(id: string): Promise<GetUserDTO | null> {
    const deletedUser = await this.usersRepository.delete(id);

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return deletedUser;
  }

  async getUserByEmail(email: string): Promise<GetUserDTO | null> {
    const user = await this.usersRepository.find({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const publicUser = UserBuilder.publicUser(user);

    return publicUser;
  }

  async updateUserById(
    id: string,
    dto: UpdateUserDTO
  ): Promise<GetUserDTO | null> {
    const { email, phone_number, password_hash } = dto;

    if (Object.keys(dto).length === 0) {
      throw new Error('At least one field required to update');
    }

    if (email) {
      const isEmailAlreadyExistent = await this.usersRepository.find({
        email,
      });

      if (isEmailAlreadyExistent) {
        throw new Error('Email already exists');
      }
    }

    if (phone_number) {
      const isPhoneNumberAlreadyExistent = await this.usersRepository.find({
        phone_number,
      });

      if (isPhoneNumberAlreadyExistent) {
        throw new Error('Phone number already exists');
      }
    }

    if (password_hash) {
      throw new Error('Update password is not allowed in this route');
    }

    const user = await this.usersRepository.update(id, dto);

    if (!user) {
      throw new Error('User not found');
    }

    const publicUser = UserBuilder.publicUser(user);

    return publicUser;
  }

  async updateUserPassword(
    userId: string,
    dto: UpdatePasswordDTO
  ): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordsMatch = await passwordUtils.comparePass(
      dto.currentPassword,
      user.password_hash
    );

    if (!passwordsMatch) {
      throw new Error('Invalid current password');
    }

    if (dto.password !== dto.passwordConfirm) {
      throw new Error('Passwords does not match');
    }

    const password_hash = await passwordUtils.hashPass(dto.password);

    await this.usersRepository.update(userId, { password_hash });
  }
}
