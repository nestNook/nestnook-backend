import { type Request, type Response } from 'express';

export interface RolesControllerInterface {
  createRole: (req: Request, res: Response) => Promise<Response>;
  getRoleById: (req: Request, res: Response) => Promise<Response>;
  listRoles: (req: Request, res: Response) => Promise<Response>;
  deleteRole: (req: Request, res: Response) => Promise<Response>;
  updateRole: (req: Request, res: Response) => Promise<Response>;
}
