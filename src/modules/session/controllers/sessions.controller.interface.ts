import { Request, Response } from 'express';

export interface SessionsControllerInterface {
  getUserSessions(req: Request, res: Response): Promise<Response>;
  createSession(req: Request, res: Response): Promise<Response>;
}
