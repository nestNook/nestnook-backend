import { AuthRepositoryInterface } from './auth.repository.interface';
import { User } from '@modules/users/dto';
import { prisma } from '@infra/database';
import { Session, UpdateSessionDTO } from '@modules/session/dtos';
import SessionModel from '@modules/session/models/sessions.model';

export class AuthRepository implements AuthRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async findSessionById(sessionId: string): Promise<Session | null> {
    const session = await SessionModel.findOne({
      id: sessionId,
    });
    return session;
  }

  async updateSession(
    sessionId: string,
    dto: UpdateSessionDTO
  ): Promise<Session | null> {
    const session = await SessionModel.findOneAndUpdate(
      { id: sessionId },
      dto,
      { new: true }
    );
    return session;
  }
}
