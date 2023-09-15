import { type Request, type Response } from 'express';

export interface UsersControllerInterface {
  createUser: (req: Request, res: Response) => Promise<Response>;
  getMe: (req: Request, res: Response) => Promise<Response>;
  deleteMe: (req: Request, res: Response) => Promise<Response>;
  updateMe: (req: Request, res: Response) => Promise<Response>;
  updatePassword: (req: Request, res: Response) => Promise<Response>;
  givePrivileges: (req: Request, res: Response) => Promise<Response>;
}
