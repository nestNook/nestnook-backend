import { type Request, type Response, type NextFunction } from 'express';

export interface SectorControllerInterface {
  createSector: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
}
