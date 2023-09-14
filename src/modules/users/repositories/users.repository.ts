import { prisma } from '@infra/database';
import {
  type InternCreateUserDTO,
  type UpdateUserDTO,
  type User,
  type UserQuery,
} from '../dtos';
import { type UsersRepositoryInterface } from './users.repository.interface';

export class UsersRepository implements UsersRepositoryInterface {
  async create(dto: InternCreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: dto,
      include: {
        role: true,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });

    return deletedUser;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User | null> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: dto,
      include: {
        role: true,
      },
    });

    return updatedUser;
  }

  async find(dto: UserQuery): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: dto,
      include: {
        role: true,
      },
    });

    return user;
  }
}
