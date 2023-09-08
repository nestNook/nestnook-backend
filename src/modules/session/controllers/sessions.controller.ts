import { Request, Response } from 'express';
import { SessionsControllerInterface } from './sessions.controller.interface';
import { SessionsServiceInterface } from '../services/sessions.service.interface';
import { CreateSessionDTO, Session } from '../dtos';

export class SessionsController implements SessionsControllerInterface {
  constructor(private sessionsService: SessionsServiceInterface) {}

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
    const dto: CreateSessionDTO = req.body;
    const session: Session = await this.sessionsService.createSession(dto);

    return res.status(201).json({
      status: 'success',
      data: session,
    });
  }
}
