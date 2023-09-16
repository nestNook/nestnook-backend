import { type Request, type Response } from 'express';

export interface SectorControllerInterface {
  createSector: (req: Request, res: Response) => Promise<Response>;
  findById: (req: Request, res: Response) => Promise<Response>;
  updateSector: (req: Request, res: Response) => Promise<Response>;
  deleteSector: (req: Request, res: Response) => Promise<Response>;
}
