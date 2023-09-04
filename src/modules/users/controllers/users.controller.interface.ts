import { Request, Response, NextFunction } from 'express';

export interface UsersControllerInterface {
  createUser(req: Request, res: Response): Promise<Response>;
  getMe(req: Request, res: Response): Promise<Response>;
}
