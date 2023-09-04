import { prisma } from '@infra/database';
import { AuthRepositoryInterface } from './auth.repository.interface';
import { User } from '@modules/users/dto';

export class AuthRepository implements AuthRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
