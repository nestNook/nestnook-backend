import { SessionsControllerInterface } from './sessions.controller.interface';
import { SessionsServiceInterface } from '../services/sessions.service.interface';
import { SessionDTO } from '@@types/session.dto';
import { Request, Response } from 'express';
import { User } from '@modules/users/dtos';
import { Controller } from '@common/controller.decorator';

@Controller
export class SessionsController implements SessionsControllerInterface {
  constructor(private readonly sessionsService: SessionsServiceInterface) {}

  async getUserSessions(req: Request, res: Response): Promise<Response> {
    const { id } = req.app.locals.user;
    const sessions = await this.sessionsService.findUserSessions(id);

    return res.status(200).json({
      status: 'success',
      results: sessions.length,
      data: sessions,
    });
  }

  async createSession(req: Request, res: Response): Promise<Response> {
    const dto: User = req.app.locals.user;
    const session: SessionDTO = await this.sessionsService.createSession(dto);

    return res.status(201).json({
      status: 'success',
      data: session,
    });
  }

  async deleteSession(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.app.locals.user;
    const { id: sessionId } = req.params;

    const session = await this.sessionsService.deleteSession(userId, sessionId);

    return res.status(200).json({
      status: 'success',
      data: session,
    });
  }
}
