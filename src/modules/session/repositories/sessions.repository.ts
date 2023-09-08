import SessionModel from '../models/sessions.model';
import { CreateSessionDTO, Session, UpdateSessionDTO } from '../dtos';
import { SessionsRepositoryInterface } from './sessions.repository.interface';

export class SessionsRepository implements SessionsRepositoryInterface {
  async createSession(dto: CreateSessionDTO): Promise<Session> {
    const session = await SessionModel.create(dto);
    return session;
  }

  async deleteSession(
    sessionId: string,
    userId: string
  ): Promise<Session | null> {
    const session = await SessionModel.findOneAndDelete({
      $and: [
        {
          id: sessionId,
          user_id: userId,
        },
      ],
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

  async findSessionById(sessionId: string): Promise<Session | null> {
    const session = await SessionModel.findOne({
      id: sessionId,
    });
    return session;
  }

  async findSessionsByUserId(userId: string): Promise<Session[]> {
    const session = await SessionModel.find({ user_id: userId });
    return session;
  }
}
