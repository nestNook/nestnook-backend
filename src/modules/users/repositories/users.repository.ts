import { User } from '../dto';
import { prisma } from '@infra/database';
import { InternCreateUserDTO } from '../dto/intern-create-user.dto';
import { UsersRepositoryInterface } from './users.repository.interface';

export class UsersRepository implements UsersRepositoryInterface {
  async create(dto: InternCreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: dto,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
