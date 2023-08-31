import { Request, Response, NextFunction } from 'express';

export interface SectorControllerInterface {
  createSector(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
