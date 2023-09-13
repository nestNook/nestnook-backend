import { prisma } from '@infra/database';
import { InternCreateUserDTO, UpdateUserDTO, User, UserQuery } from '../dtos';
import { UsersRepositoryInterface } from './users.repository.interface';

export class UsersRepository implements UsersRepositoryInterface {
  async create(dto: InternCreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: dto,
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
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
    });

    return updatedUser;
  }

  async find(dto: UserQuery): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: dto,
    });

    return user;
  }
}
