import { type Request, type Response } from 'express';
export interface AuthControllerInterface {
  signIn: (req: Request, res: Response) => Promise<Response>;
}
