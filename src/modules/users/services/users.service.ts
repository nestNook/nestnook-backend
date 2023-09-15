import { type RolesRepositoryInterface } from '@modules/roles/repositories/roles.repository.interface';
import { type UsersRepositoryInterface } from '../repositories/users.repository.interface';
import { BadRequestException } from '@src/errors/bad-request-exception';
import { NotFoundException } from '@src/errors/not-found-exception';
import { ForbiddenException } from '@src/errors/forbidden-exception';
import { type UsersServiceInterface } from './users.service.interface';
import { UserBuilder } from '../builders/user.builder';
import { type SessionDTO } from '@@types/session.dto';
import { UserRoles } from '@@types/user-roles';

import sessionModule from '@modules/session/session.module';
import validationUtils from '@utils/validation-utils';
import passwordUtils from '@utils/password-utils';

import {
  type CreateUserDTO,
  type GetUserDTO,
  type UpdatePasswordDTO,
  type UpdateUserDTO,
} from '../dtos';

export class UsersService implements UsersServiceInterface {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly rolesRepository: RolesRepositoryInterface,
  ) {}

  async createUser({
    email,
    name,
    phone_number,
    password,
    password_confirm,
  }: CreateUserDTO): Promise<SessionDTO> {
    const isEmailAlreadyExistent = await this.usersRepository.find({ email });

    if (isEmailAlreadyExistent) {
      throw new BadRequestException('Email already exists');
    }

    if (password !== password_confirm) {
      throw new BadRequestException('Passwords does not match');
    }

    const role = await this.rolesRepository.getByName(UserRoles.CUSTOMER);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const password_hash = await passwordUtils.hashPass(password);

    const user = await this.usersRepository.create({
      email,
      name,
      phone_number,
      password_hash,
      role_id: role.id,
    });

    const session = await sessionModule.service.createSession(user);

    return session;
  }

  async getUserById(userId: string): Promise<GetUserDTO | null> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const publicUser = UserBuilder.publicUser(user);

    return publicUser;
  }

  async deleteUserById(id: string): Promise<GetUserDTO | null> {
    const deletedUser = await this.usersRepository.delete(id);

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return deletedUser;
  }

  async getUserByEmail(email: string): Promise<GetUserDTO | null> {
    const user = await this.usersRepository.find({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const publicUser = UserBuilder.publicUser(user);

    return publicUser;
  }

  async updateUserById(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<GetUserDTO | null> {
    const { email, phone_number } = dto;

    const emailPromise = email
      ? this.usersRepository.find({ email })
      : Promise.resolve(null);

    const phoneNumberPromise = phone_number
      ? this.usersRepository.find({ phone_number })
      : Promise.resolve(null);

    const [existingEmailUser, existingPhoneNumberUser] = await Promise.all([
      emailPromise,
      phoneNumberPromise,
    ]);

    if (existingEmailUser) {
      throw new BadRequestException('Email already exists');
    }

    if (existingPhoneNumberUser) {
      throw new BadRequestException('Phone number already exists');
    }

    if (validationUtils.isObjectEmpty(dto)) {
      throw new BadRequestException('At least one field required to update');
    }

    const updatedUser = await this.usersRepository.update(id, dto);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    const publicUser = UserBuilder.publicUser(updatedUser);

    return publicUser;
  }

  async updateUserPassword(
    userId: string,
    dto: UpdatePasswordDTO,
  ): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordsMatch = await passwordUtils.comparePass(
      dto.currentPassword,
      user.password_hash,
    );

    if (!passwordsMatch) {
      throw new ForbiddenException('Invalid current password');
    }

    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException('Passwords does not match');
    }

    const password_hash = await passwordUtils.hashPass(dto.password);

    await this.usersRepository.update(userId, { password_hash });
  }
}
