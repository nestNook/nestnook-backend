import SessionModel from '../providers/sessions.provider';

import { Session } from '../dtos/session.dto';
import { UpdateSessionDTO } from '../dtos/update-session.dto';
import { CreateSessionDTO } from '../dtos/create-session.dto';
import { SessionsRepositoryInterface } from './sessions.repository.interface';

export class SessionsRepository implements SessionsRepositoryInterface {
  async create(dto: CreateSessionDTO): Promise<Session> {
    const session = await SessionModel.create(dto);
    return session;
  }

  async delete(sessionId: string): Promise<Session | null> {
    const session = await SessionModel.findOneAndDelete({ id: sessionId });
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

  async findById(sessionId: string): Promise<Session | null> {
    const session = await SessionModel.findById(sessionId);
    return session;
  }

  async findByUserId(userId: string): Promise<Session[]> {
    const session = await SessionModel.find({ user_id: userId });
    return session;
  }
}
