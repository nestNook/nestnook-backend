import { Request, Response } from 'express';
export interface AuthControllerInterface {
  signIn(req: Request, res: Response): Promise<Response>;
}
