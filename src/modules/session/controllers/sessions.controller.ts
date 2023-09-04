import { Request, Response } from 'express';
import { SessionsControllerInterface } from './sessions.controller.interface';
import { SessionsServiceInterface } from '../services/sessions.service.interface';

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
}
